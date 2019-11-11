import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async deleteUser(userID: string): Promise<object> {
        const deleteUser: object = await this.userModel.findByIdAndDelete(userID);
        return deleteUser;
    }
}
