
import {Customer, Payment} from './model';
import { Request, Response } from 'express';
import { sendFailedResponse, sendSuccessResponse } from '../Utils';
import { sequelize } from '../Config/database';
import { printer } from '../Utils';
import { User } from '../UserModule/model';
import moment from 'moment';
import { Sales } from '../POSModule/sales_model';
export const Controller = {
    create : async (req:Request,res:Response) =>{
       try {
        const body = req.body;
        const customer = new Customer(body);
        const exists = await customer.getCustomers({phoneNumber:body?.phoneNumber});
        if(exists?.length > 0 ){
            return  res.send(sendFailedResponse(
                {
                    message:'Phone number already used'
                }
            ))
        }
        const result =  await customer.createCustomer();
        return res.send(sendSuccessResponse({ message:'Customer created successfully',data:result }));
       } catch (error) {
        return res.send(sendFailedResponse(
            {error}
        ))
       }
    },

    pay:async (req:Request,res:Response) => {
        const transaction = await sequelize.transaction();
        try {
             const body = req.body;
             await Customer.decrement('balance',{by:parseFloat(`${body?.paidAmount || 0.0}`),where:{id:body?.customerId},transaction})
                const now = Date.now()
              const payment = await Payment.create({...body,reference:`${now}`},{transaction});
              const customer = await Customer.findByPk(body?.customerId,{transaction})
              const seller = await User.findByPk(payment.paidTo,{transaction});
              transaction.commit();
             await printer.printContent(printer.paymentPrintView({
                    reference:payment.reference,
                    customerName:customer?.name,
                    seller:seller?.name,
                    amountPaid:parseFloat(`${payment?.paidAmount || '0.0'}`).toFixed(2),
                    previousBalance:parseFloat(`${payment?.previousAmount || '0.0'}`).toFixed(2),
                    balance:parseFloat(`${customer?.balance || '0.0'}`).toFixed(2),
                    date:moment(payment?.updatedAt).format('YYYY-MM-DD HH:mm')
              }));
             return res.send(sendSuccessResponse({ message:'Payment updated successfully' }));

        } catch (error) {
            transaction.rollback()
            return res.send(sendFailedResponse(
                {error}
            ))
        }
    },
    update : async (req:Request,res:Response) =>{
       try {
        const customer = new Customer(req.body);
        const result =  await customer.updateCustomer();
        return res.send(sendSuccessResponse({ message:'Customer updated successfully',data:result }));
       } catch (error) {
        return res.send(sendFailedResponse(
            {error}
        ))
       }
    },
    getCustomers : async (req:Request,res:Response) =>{
       try {
        const customer = new Customer();
        const result =  await customer.getCustomers(JSON.parse(JSON.stringify(req.query || {})));
        return res.send(sendSuccessResponse({ message:'Customers retrieved successfully',data:result }));
       } catch (error) {
        return res.send(sendFailedResponse(
            {error}
        ))
       }
    },
    getCustomerHistory : async (req:Request,res:Response) =>{
       try {
        const param = JSON.parse(JSON.stringify(req.query));
        const paymentHistory = await Payment.findAll({
            where:{customerId:param?.customerId},order:[['createdAt',"DESC"]],limit:50
        });

        const salesHistory = await Sales.findAll({
            where:{customerId:param?.customerId},order:[['createdAt',"DESC"]],limit:50
        });

        return res.send(sendSuccessResponse({ message:'Customers history retrieved successfully',data:{ payment:paymentHistory,purchases:salesHistory } }));
       } catch (error) {
        return res.send(sendFailedResponse(
            {error}
        ))
       }
    },
    deleteCustomer : async (req:Request,res:Response) =>{
       try {
        const customer = new Customer(req.body);
        const result =  await customer.deleteCustomer()
        return res.send(sendSuccessResponse({ message:'Customer deleted successfully',data:result }));
       } catch (error) {
        return res.send(sendFailedResponse(
           { error}
        ))
       }
    }
}
