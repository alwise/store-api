
import { User } from './model';
import { Request, Response } from 'express';
import { sendFailedResponse, sendSuccessResponse } from '../Utils';

export const Controller = {
    initSuperAdmin: async () => {
        try {
            console.log('====================================');
            console.log('Checking for super admin');
            console.log('====================================');
            const body = {
                name: 'admin',
                phoneNumber: '0247417122',
                password: process.env.password,
                role: 'admin'
            }
            const user = new User(body);
            const exists = await user.getUsers({ phoneNumber: body?.phoneNumber });
            if (exists?.length > 0) {
                console.log('====================================');
                console.log('Super admin data exists already, cleaning up');
                console.log('====================================');
                return;
            }
            await user.createUser();
            console.log('====================================');
            console.log('Super admin created successfully');
            console.log('====================================');
            return;
        } catch (error) {
            console.log('====================================');
            console.log('unable to create supper admin due to: ', error?.message);
            console.log('====================================');
        }

    },
    create: async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const user = new User({ ...body, password: body?.phoneNumber });
            const exists = await user.getUsers({ phoneNumber: body?.phoneNumber });
            if (exists?.length > 0) {
                return res.send(sendFailedResponse(
                    {
                        message: 'Phone number already used'
                    }
                ))
            }
            const result = await user.createUser();
            return res.send(sendSuccessResponse({ message: 'User created successfully', data: result }));
        } catch (error) {
            return res.send(sendFailedResponse(
                { error }
            ))
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const user = new User(body);
            const result = await user.login();
            if (result === undefined) {
                return res.send(sendFailedResponse({ message: 'Wrong username or password' }));
            }
            return res.send(sendSuccessResponse({ message: 'User login successfully', data: result }));
        } catch (error) {
            return res.send(sendFailedResponse(
                { error }
            ))
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const user = new User(req.body);
            const result = await user.updateUser();
            return res.send(sendSuccessResponse({ message: 'User updated successfully', data: result }));
        } catch (error) {
            return res.send(sendFailedResponse(
                { error }
            ))
        }
    },
    getUsers: async (req: Request, res: Response) => {
        try {
            const user = new User();
            const result = await user.getUsers(JSON.parse(JSON.stringify(req.query || {})));
            const data = result.filter((val) => val.phoneNumber !== '0247417122')
            return res.send(sendSuccessResponse({ message: 'Users retrieved successfully', data }));
        } catch (error) {
            return res.send(sendFailedResponse(
                { error }
            ))
        }
    },

    getUserById: async (req: Request, res: Response) => {
        try {
            const user = new User();
            const result = await user.getUser(req.params?.id);
            return res.send(sendSuccessResponse({ message: 'User retrieved successfully', data: result }));
        } catch (error) {
            return res.send(sendFailedResponse(
                { error }
            ))
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try {
            const user = new User(req.body);
            const result = await user.deleteUser()
            return res.send(sendSuccessResponse({ message: 'User deleted successfully', data: result }));
        } catch (error) {
            return res.send(sendFailedResponse(
                { error }
            ))
        }
    }


}
