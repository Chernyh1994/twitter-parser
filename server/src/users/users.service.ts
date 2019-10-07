import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getUser(userID): Promise<User> {
        const user = await this.userModel
            .findById(userID)
            .exec();
        return user;
    }

    async addUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = await this.userModel(createUserDto);
        return newUser.save();
    }

    async editUser(userID, createUserDto: CreateUserDto): Promise<User> {
        const editedUser = await this.userModel
            .findByIdAndUpdate(userID, createUserDto, { new: true });
        return editedUser;
    }

    async deleteUser(userID): Promise<any> {
        const deletedUser = await this.userModel
            .findByIdAndRemove(userID);
        return deletedUser;
    }
}
