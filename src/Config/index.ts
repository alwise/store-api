import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
dotenv.config()
const dialect : Dialect = 'postgres';

export const Configs = {
    database : {
        DB_URL_TEST :'postgres://postgres:admin@localhost:5432/store',
        DB_URL_PRODUCTION :'',
        DBB_URL : 'postgres://postgres:admin@localhost:5432/store' ,
        options: {
            dialect,
            dialectOptions:{
                decimalNumbers: true
                // ssl: {
                //     require: false, // This will help you. But you will see nwe error
                //     rejectUnauthorized: false // This line will fix new error
                //   }
            }
        }
    },
    keys:{
        secrete:process.env.secrete || 'no-secrete-found'
    }
}