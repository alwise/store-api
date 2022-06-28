import {Product} from './model';
import { Request, Response } from 'express';
import { sendFailedResponse, sendSuccessResponse } from '../Utils';


export const Controller = {

    create : async (req:Request,res:Response) =>{
        try {
         const body = req.body;
         const product = new Product(body);
         const exists = await product.getProducts({productName:body?.productName});
         if(exists?.length > 0 ){
             return  res.send(sendFailedResponse(
                 {
                     message:'This product already exist'
                 }
             ))
         }
         const result =  await product.createProduct();
         return res.send(sendSuccessResponse({ message:'Product created successfully',data:result }));
        } catch (error) {
         return res.send(sendFailedResponse(
             {error}
         ))
        }
     },

     update : async (req:Request,res:Response) =>{
        try {
         const product = new Product(req.body);
         const result =  await product.updateProduct();
         return res.send(sendSuccessResponse({ message:'Product updated successfully',data:result }));
        } catch (error) {
         return res.send(sendFailedResponse(
             {error}
         ))
        }
     },
     getProducts : async (req:Request,res:Response) =>{
        try {
         const product = new Product();
         const result =  await product.getProducts(JSON.parse(JSON.stringify(req.query || {})));
         return res.send(sendSuccessResponse({ message:'Products retrieved successfully',data:result }));
        } catch (error) {
         return res.send(sendFailedResponse(
             {error}
         ))
        }
     },
     deleteProduct : async (req:Request,res:Response) =>{
        try {
         const product = new Product(req.body);
         const result =  await product.deleteProduct()
         return res.send(sendSuccessResponse({ message:'Product deleted successfully',data:result }));
        } catch (error) {
         return res.send(sendFailedResponse(
            { error}
         ))
        }
     }
 

}