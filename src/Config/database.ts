import {Sequelize} from "sequelize";
import { Configs } from ".";



export const sequelize = new Sequelize( Configs.database.DBB_URL, {
    ...Configs.database.options
});

