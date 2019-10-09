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

  async registration(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userModel(createUserDto);
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);
    newUser.roles = ["admin"];
    return newUser.save();
  }

  async login(username, password) {
    const userFromDb = await this.userModel.findOne({ username: username});
    if (!userFromDb) { throw new HttpException('USERNAME_NOT_FOUND', HttpStatus.NOT_FOUND); }

    const isValidPass = await bcrypt.compare(password, userFromDb.password);
    if (!isValidPass) {
      return {error: 'Password is incorrect please try again'};
    }
    const token: string = jwt.sign({}, 'rwerwer', {expiresIn: '100h'});
    return {token, message: 'Login successful'};

    // if (isValidPass) {
    //   const accessToken = await this.jwtService.sign(username, userFromDb.roles);
    //   return { token: accessToken, user: new UserDto(userFromDb)};
    // } else {
    //   throw new HttpException('LOGIN.ERROR', HttpStatus.UNAUTHORIZED);
    // }

  }

}
