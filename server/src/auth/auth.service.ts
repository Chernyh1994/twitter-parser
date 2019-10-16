import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../users/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({username}).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({email}).exec();
  }

  isValidEmail(email: string) {
    if (email) {
      // tslint:disable-next-line: max-line-length
      const control = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return control.test(email);
    } else { return false; }
  }

  async registration(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userModel(createUserDto);
    if (this.isValidEmail(newUser.email)) {
      const userRegisterEmail = await this.findByEmail(newUser.email);
      const userRegisterName = await this.findByUsername(newUser.username);
      if (!userRegisterEmail && !userRegisterName) {
        newUser.password = await bcrypt.hash(newUser.password, saltRounds);
        newUser.role = 'admin';
        return newUser.save();
      } else {
        throw new HttpException('REGISTRATION.USER_ALREADY_REGISTERED', HttpStatus.FORBIDDEN); }
    }
  }

  async login(username, password) {
    const userFromDb = await this.userModel.findOne({ username});
    if (!userFromDb) { throw new HttpException('USERNAME_NOT_FOUND', HttpStatus.NOT_FOUND); }

    const isValidPass = await bcrypt.compare(password, userFromDb.password);
    if (!isValidPass) { throw new HttpException('PASSWORD_NOT_FOUND', HttpStatus.NOT_FOUND); }

    const token: string = jwt.sign({id: userFromDb._id, role: userFromDb.role}, 'rwerwer', {expiresIn: '100h'});
    return {token};
  }
}
