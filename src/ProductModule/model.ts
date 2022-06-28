import {sequelize} from '../Config/database';
import { DataTypes, Model,UUIDV4 } from 'sequelize';

interface ProductInt {
    id?:string | undefined;
    productName:string | undefined;
    price?:string | number | undefined;
    quantity:string | number | undefined;
    updatedAt?:string | undefined
}

export class  Product extends Model {
    id:string ;
    productName:string ;
    price: number ;
    quantity: number ;

    Product(){

    }

    createProduct = async () =>{
        return await Product.create({
            productName:this.productName,
            price:parseFloat(`${this.price || 0.0}`),
            quantity:parseInt(`${this.quantity || 0}`)
        });
    }

    updateProduct = async () =>{
        return await Product.update({
            productName:this.productName,
            price:this.price,
            quantity:this.quantity
        },{where:{id:this.id}});
    }
    deleteProduct = async () =>{
        return await Product.destroy({where:{id:this.id}});
    }
    getProducts = async (options:object) =>{
        return await Product.findAll({where:{...options}});
    }

}

Product.init({
    id:{type:DataTypes.UUID,allowNull:false,primaryKey:true,defaultValue:UUIDV4},
    productName:{type:DataTypes.STRING(180)},
    price:{type:DataTypes.DOUBLE(10,2),allowNull:false,defaultValue:0.0},
    quantity:{type:DataTypes.INTEGER(),allowNull:false,defaultValue:0}
},{sequelize,underscored:true})