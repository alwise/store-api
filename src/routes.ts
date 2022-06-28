import { Router } from "express";
import { userRoute } from './UserModule/routes';
import { productRoute } from './ProductModule/route';
import { customerRoute } from './CustomerModule/routes';
import { posRoute } from './POSModule/route';

export const routes = Router();

routes.use('/users',userRoute);
routes.use('/products',productRoute);
routes.use('/customers',customerRoute);
routes.use('/pos',posRoute);

