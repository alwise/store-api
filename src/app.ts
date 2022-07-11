import express,{Request,Response} from 'express';
import cors from 'cors'
import { sequelize } from './Config/database';
import { Controller } from './UserModule/controllers';

import { routes } from './routes';
import { printer } from './Utils';
import printer_design from './Utils/printer_design';
const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true,limit:'50mb'}));
app.use(express.json());
app.use('/printers',(req:Request,res:Response)=>{
    return res.send(printer_design.getPrinters())
})
app.use('/v1',routes);

const PORT = process.env.PORT || 3200;

sequelize.sync({alter:true}).then((db)=>{
    console.log('====================================');
    console.log('Database connected successfully ');
    console.log('====================================');
    app.listen(PORT,async ()=>{
        console.log('====================================');
        console.log('App started and running on port: ',PORT);
        console.log('====================================');
        await Controller.initSuperAdmin();
    })
}).catch((err)=>{
    console.log('====================================');
    console.log('Database connection err due to: ',err?.message);
    console.log('====================================');
})