import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../users/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as JWT from 'jwt-decode';
import { ObjectId } from 'mongodb';

const saltRounds = 10;

@Injectable()
export class AuthService {
  decode: any;
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
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

  isValidPassword(password: string) {
    if (password.length >= 6) {
      return password;
    } else { return false; }
  }

  async registration(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User =  new this.userModel(createUserDto);
    if (this.isValidEmail(newUser.email) && this.isValidPassword(newUser.password)) {
      const userRegisterEmail: User = await this.findByEmail(newUser.email);
      const userRegisterName: User = await this.findByUsername(newUser.username);
      if (!userRegisterEmail && !userRegisterName) {
        newUser.password = await bcrypt.hash(newUser.password, saltRounds);
        newUser.role = 'user';
        return newUser.save();
      } else {
        throw new HttpException('REGISTRATION.USER_ALREADY_REGISTERED', HttpStatus.FORBIDDEN); }
    }
  }

  async login(username: any, password: any): Promise<{token: string;}> {
    const userFromDb: User = await this.userModel.findOne({ username});
    if (!userFromDb) { throw new HttpException('USERNAME_NOT_FOUND', HttpStatus.BAD_REQUEST); }

    const isValidPass: boolean = await bcrypt.compare(password, userFromDb.password);
    if (!isValidPass) { throw new HttpException('PASSWORD_NOT_FOUND', HttpStatus.BAD_REQUEST); }

    return {
      token: this.jwtService.sign({
        id: userFromDb._id,
        role: userFromDb.role}),
    };
  }

  async user(req: any): Promise<User> {
    this.decode = await JWT(req.headers.authorization.split(' ')[1]);
    return await this.userModel.findById({ _id: new ObjectId(this.decode.id)});
  }
}
