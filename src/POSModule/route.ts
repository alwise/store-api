import { Router } from "express";
import { Controller } from "./controller";


export const posRoute = Router();

posRoute.post('/',Controller.create )
        .post('/print',Controller.printSalesReceipt)
        // .patch('/',Controller.update)
        // .delete('/',Controller.deleteCustomer)
        .get('/stats',Controller.stats)
        .get('/',Controller.getSales)