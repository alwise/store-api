import { DataTypes, Model } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Configs } from '../Config/index';
import { UUIDV4 } from "sequelize";
import { sequelize } from '../Config/database'

export type UserRoles = 'cashier' | 'stock keeper' | 'credit sales' | 'admin'
interface UserInt {
    id?: string;
    name?: string | undefined;
    phoneNumber?: string | undefined;
    password?: string | undefined;
    role?: UserRoles;
    token?: string | undefined;
    isDeleted?: boolean | undefined
}

export class User extends Model {
    id?: string;
    name?: string | undefined;
    phoneNumber?: string | undefined;
    password?: string | undefined;
    role?: UserRoles;
    token?: string | undefined;
    isDeleted?: boolean | undefined


    User() {
        // this.id = user?.id;
        // this.name = user?.name;
        // this.phoneNumber = user?.phoneNumber;
        // this.password = user?.password;
        // this.role = user?.role;
        console.log('====================================');
        console.log('User model class initialized');
        console.log('====================================');

    }

    encodePassword = async (pass: string | undefined) => {
        const hash = await bcrypt.hashSync(pass, 10);
        return hash;
    }

    decodePassword = async (pass: string, passwordHash: string) => {
        return await bcrypt.compareSync(pass, passwordHash);
    }

    tokenizer = (data: UserInt) => {
        return jwt.sign(
            {
                id: data?.id,
                phoneNumber: data?.phoneNumber,
                role: data?.role,
            },
            Configs.keys.secrete,
            { expiresIn: "10yr" }
        );
    }

    userResponseData = async (user: UserInt) => {
        return {
            id: user?.id,
            name: user?.name,
            phoneNumber: user?.phoneNumber,
            role: user?.role,
            token: this.tokenizer(user)
        }
    }

    createUser = async () => {
        const result = await User.create({
            name: this.name,
            phoneNumber: this.phoneNumber,
            password: await this.encodePassword(this.password),
            role: this.role,
        });
        return this.userResponseData(result.toJSON());
    }
    login = async () => {

        console.log('====================================');
        console.log(this.phoneNumber);
        console.log('====================================');

        const useExist = await User.findOne({
            where: { phoneNumber: this.phoneNumber }
        });

        if (useExist?.id && this.decodePassword(this.password, useExist?.password)) {
            return this.userResponseData(useExist.toJSON());
        }

        return undefined;
    }

    updateUser = async () => {
        return await User.update({
            phoneNumber: this.phoneNumber,
            name: this.name,
            role: this.role,
        }, { where: { id: this.id } });
    }

    deleteUser = async () => {
        return await User.destroy({ where: { id: this.id }, force: false })
    }
    getUsers = (options?: object) => {
        return User.findAll({ where: { ...options }, paranoid: true })
    }

    getUser = (id?: string) => {
        return User.findOne({ where: { id: id }, paranoid: true })
    }

}

User.init({
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: UUIDV4 },
    name: { type: DataTypes.STRING(180), allowNull: false },
    phoneNumber: { type: DataTypes.STRING(12) },
    password: { type: DataTypes.STRING(180), allowNull: false },
    role: { type: DataTypes.STRING(12) }
}, { sequelize, underscored: true, paranoid: true })

