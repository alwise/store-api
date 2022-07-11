import {sequelize} from '../Config/database';
import { DataTypes, Model,UUIDV4 } from 'sequelize';
import moment from 'moment';
import { SalesItem, SalesItemInt } from './sales_item_model';


export interface SalesInt{
    id?:string;
    reference?:string;
    soldBy?:string;
    customerId?:string;
    subTotal:number;
    balance:number;
    amountPaid:number;
    isCredit:boolean;
    date?:Date
    yearMonth?:string
    items?:SalesItemInt[];
}


export class Sales extends Model{
    id?:string;
    reference?:string;
    soldBy?:string;
    customerId?:string;
    subTotal:number;
    balance:number;
    amountPaid:number;
    isCredit:boolean;
    date?:Date
    yearMonth?:string;
    items?:SalesItemInt[];
    Sales(){

    }
    
    // createSalesItems = async (salesData) =>{
        
    // }

    getSales = async (options:object) =>{
        return await Sales.findAll({where:{...options},include:[{all:true}]});
    }

}

Sales.init({
    id:{type:DataTypes.UUID,allowNull:false,primaryKey:true,defaultValue:UUIDV4},
    reference:{type:DataTypes.STRING(200)},
    soldBy:{type:DataTypes.UUID,allowNull:false},
    customerId:{type:DataTypes.STRING(180),allowNull:false,defaultValue:'unknown'},
    subTotal:{type:DataTypes.DOUBLE(10,2),allowNull:false,defaultValue:0.0},
    balance:{type:DataTypes.DOUBLE(10,2),allowNull:false,defaultValue:0.0},
    amountPaid:{type:DataTypes.DOUBLE(10,2),allowNull:false,defaultValue:0.0},
    isCredit:{type:DataTypes.BOOLEAN(),allowNull:false,defaultValue:false},
    date:{type:DataTypes.DATEONLY(),allowNull:false},
    yearMonth:{type:DataTypes.STRING(20),allowNull:false,defaultValue:moment().format('YYYY-MM')},
},{sequelize,underscored:true});

Sales.hasMany(SalesItem,{ as:'items', foreignKey:'salesId',onDelete:"CASCADE"})