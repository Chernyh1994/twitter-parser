import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async getUser(userID): Promise<User> {
        const user = await this.userModel
            .findById(userID)
            .exec();
        return user;
    }

    async createNewUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = await this.userModel(createUserDto);
        newUser.roles = ["admin"];
        return newUser.save();
    }

    async deleteUser(userID): Promise<any> {
        const deletedUser = await this.userModel
            .findByIdAndRemove(userID);
        return deletedUser;
    }
}
