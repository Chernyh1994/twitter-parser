import {
    Controller,
    Post,
    HttpStatus,
    Get,
    Body,
    Response,
    UseInterceptors,
    Req,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { Login } from './interfaces/login.interface';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService ) {}

  @Post('register')
  public async registration(@Response() res: any,  @Body() createUserDto: CreateUserDto): Promise<object> {
    try {
      const result: object = await this.authService.registration(createUserDto);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
        return res.status(400).json({
          status: 'error',
          message: 'There was a problem creating the user, please try again.',
        });
      }
  }

  @Post('login')
  public async login(@Response() res: any, @Body() login: Login): Promise<object> {
    try {
      const result: object = await this.authService.login(login.username, login.password);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid email or password.',
        });
      }
  }

  @Get('user')
  public async user(@Req() req: any, @Response() res: any): Promise<any> {
    try {
      const user: object = await this.authService.user(req);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user.',
      });
    }
  }

}
