import { Router } from "express";
import { Controller } from "./controllers";
import { User } from "./model";

export const userRoute = Router();

userRoute.post('/',Controller.create )
        .post('/login',Controller.login)
        .patch('/',Controller.update)
        .delete('/',Controller.deleteUser)
        .get('/',Controller.getUsers)