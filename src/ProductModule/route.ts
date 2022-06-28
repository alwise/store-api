import { Router } from "express";
import { Controller } from "./controller";


export const productRoute = Router();

productRoute.post('/',Controller.create )
        // .post('/login',Controller.login)
        .patch('/',Controller.update)
        .delete('/',Controller.deleteProduct)
        .get('/',Controller.getProducts)