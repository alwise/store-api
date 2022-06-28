import {SalesItem, SalesItemInt} from './sales_item_model';
import {Sales} from './sales_model';
import {Customer} from '../CustomerModule/model';
import { Request, Response } from 'express';
import { sendFailedResponse, sendSuccessResponse } from '../Utils';
import { sequelize } from '../Config/database';
import moment from 'moment';


interface Stats{
    totalAmount:number;
    salesCount:number;
}


export const Controller = {

    create : async (req:Request,res:Response) =>{
        const transaction = await sequelize.transaction();
       try {
        const body = req.body;
        const itemsCopy:any[] = body?.items;
        const items:Partial<SalesItemInt>[] = [];
       
        /**
         * submit sales data
         */
        const ref = Date.now();
        const dateSold = moment().format('YYYY-MM-DD')
        const month = moment().format('YYYY-MM')
        const sales =  await Sales.create({
            reference:`${ref}`,
            subTotal:parseFloat(parseFloat(`${body?.subTotal || 0.0}`).toFixed(2)),
            balance:parseFloat(parseFloat(`${(body?.subTotal - body?.amountPaid)}`).toFixed(2)),
            amountPaid:parseFloat(parseFloat(`${body?.amountPaid || 0.0}`).toFixed(2)),
            soldBy:body?.soldBy,
            customerId:body?.customerId || 'unknown',
            isCredit:body?.customerId === undefined ? false : true,
            date:dateSold,
            yearMonth:month
        },{transaction});

        /**
         *  update customer balance
         */
        if(sales?.isCredit === true){
            if(sales?.balance > 0){
                await Customer.increment('balance',{by:sales?.balance,
                  where:{id:sales?.customerId}  ,transaction})
            }
        }
        
        /**
         * reformat and normalize items data
         */
        itemsCopy.forEach((val)=>{
            items.push({
                salesId:sales?.id,
                quantity:parseInt(`${val?.quantity || 0}`),
                price:parseFloat(parseFloat(`${val?.price || 0.0}`).toFixed(2)),
                productName:val?.productName,
                date:dateSold,
            })
        })

    /**
     * create sales items
     */
    const salesItems = await SalesItem.bulkCreate(items,{transaction});

        await transaction.commit()
        return res.send(sendSuccessResponse({ message:'Sales created successfully',data:{salesItems,sales} }));
       } catch (error) {
         await transaction.rollback();
        return res.send(sendFailedResponse(
            {error}
        ))
       }
    },

    stats: async(req:Request,res:Response)=>{
        const transaction = await sequelize.transaction();
        try {
            const option = JSON.parse(JSON.stringify(req.query || {}));
            const totalAmount = await Sales.sum('subTotal',{where:{...option},transaction});
            const salesCount = await Sales.count({ col:'id',where:{...option},transaction });
            await transaction.commit()
            return res.send(sendSuccessResponse({ message:'Sales data successfully',data:{totalAmount,salesCount} }));
        } catch (error) {
            await transaction.rollback();
            return res.send(sendFailedResponse(
                {error}
            ))
        }

    },

    getSales: async(req:Request,res:Response)=>{
       
        try {
            const option = JSON.parse(JSON.stringify(req.query || {}));
            const pos = new  Sales()
            const data = await pos.getSales(option);
            return res.send(sendSuccessResponse({ message:'Sales data retrieved successfully',data }));
        } catch (error) {
            
            return res.send(sendFailedResponse(
                {error}
            ))
        }

    }





}
