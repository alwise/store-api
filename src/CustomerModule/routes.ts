import { Router } from "express";
import { Controller } from "./controller";


export const customerRoute = Router();

customerRoute.post('/', Controller.create)
        .post('/pay', Controller.pay)
        .patch('/', Controller.update)
        .delete('/', Controller.deleteCustomer)
        .get('/history', Controller.getCustomerHistory)
        .get('/find-by-id/:id', Controller.getCustomer)
        .get('/', Controller.getCustomers)