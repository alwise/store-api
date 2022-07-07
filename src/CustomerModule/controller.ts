
import {Customer, Payment} from './model';
import { Request, Response } from 'express';
import { sendFailedResponse, sendSuccessResponse } from '../Utils';
import { sequelize } from '../Config/database';

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
              await Payment.create(body,{transaction});
              transaction.commit();
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
