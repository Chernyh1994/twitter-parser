import {
  Module, MiddlewareConsumer, NestModule,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { UserSchema } from '../users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
  ]),
  PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }) ],

  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      .forRoutes(AuthController);
   }
}
