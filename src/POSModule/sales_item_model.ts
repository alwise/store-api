import { sequelize } from '../Config/database';
import { DataTypes, Model, UUIDV4 } from 'sequelize';

export interface SalesItemInt {
    id?: string;
    productName?: string;
    price?: number;
    quantity?: number;
    salesId: string | undefined;
    date: string;
}

export class SalesItem extends Model {
    id: string;
    productName: string;
    price: number | string;
    quantity: number | string;
    salesId: string;
    date: string;



    createSalesItems = async (salesItems: any[]) => {
        return await SalesItem.bulkCreate(salesItems);
    }

    getSalesItems = async (options: object) => {
        return await SalesItem.findAll({ where: { ...options } });
    }

}

SalesItem.init({
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: UUIDV4 },
    productName: { type: DataTypes.STRING(200) },
    price: { type: DataTypes.DOUBLE(10, 2), allowNull: false, defaultValue: 0.0 },
    quantity: { type: DataTypes.INTEGER(), allowNull: false, defaultValue: 0 },
    salesId: { type: DataTypes.UUID, allowNull: false },
    date: { type: DataTypes.DATEONLY(), allowNull: false },
}, { sequelize, underscored: true })