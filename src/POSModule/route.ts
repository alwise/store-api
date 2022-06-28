import { Router } from "express";
import { Controller } from "./controller";


export const posRoute = Router();

posRoute.post('/',Controller.create )
        // .post('/login',Controller.login)
        // .patch('/',Controller.update)
        // .delete('/',Controller.deleteCustomer)
        .get('/stats',Controller.stats)
        .get('/',Controller.getSales)