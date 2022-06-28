import {sequelize} from '../Config/database';
import { DataTypes, Model,UUIDV4 } from 'sequelize';

 interface CustomerInt{
    id?:string | undefined;
    name?:string | undefined;
    phoneNumber?:string | undefined;
    balance?:number | string | undefined;
    createdAt?:string | undefined;
    updatedAt?:string | undefined;
}


export class  Customer extends Model {
    id:string;
    name:string;
    phoneNumber:string;
    balance:number
    Customer(){

    }

    createCustomer = async () =>{
        return await Customer.create({
            name:this.name,
            phoneNumber:this.phoneNumber,
            balance:parseFloat(`${this.balance || 0.0}`)
        });
    }

    updateCustomer = async () => {
        return await Customer.update({
            name:this.name,
            phoneNumber:this.phoneNumber,
            balance:parseFloat(`${this.balance || 0.0}`)
        },{where:{id:this.id}});
    }
    deleteCustomer = async () =>{
        return await Customer.destroy({where:{id:this.id}});
    }
    getCustomers = async (options:object) =>{
        return await Customer.findAll({where:{...options},order:[['balance','DESC']]});
    }

}

Customer.init({
    id:{type:DataTypes.UUID,allowNull:false,primaryKey:true,defaultValue:UUIDV4},
    name:{type:DataTypes.STRING(180)},
    balance:{type:DataTypes.DOUBLE(10,2),allowNull:false,defaultValue:0.0},
    phoneNumber:{type:DataTypes.STRING(16),defaultValue:'0000000000'}
},{sequelize,underscored:true})