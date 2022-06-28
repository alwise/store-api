
import {Customer} from './model';
import { Request, Response } from 'express';
import { sendFailedResponse, sendSuccessResponse } from '../Utils';

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
