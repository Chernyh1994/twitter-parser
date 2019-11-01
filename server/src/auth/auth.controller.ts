import { Controller, Post, HttpStatus, HttpCode, Get, Body, Response, UseInterceptors, Res, Param, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { Login } from './interfaces/login.interface';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async registration(@Response() res,  @Body() createUserDto: CreateUserDto) {
      const result = await this.authService.registration(createUserDto);
      if (!result) {
          return res.status(400).json({
            status: 'error',
            message: 'There was a problem creating the user, please try again later.',
          });
      }
      return res.status(HttpStatus.OK).json(result);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Response() res, @Body() login: Login) {
    try {
      const result = await this.authService.login(login.username, login.password);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid email or password.',
        });
      }
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  public async user(@Req() req, @Response() res) {
    const user = await this.authService.user(req);
    return res.status(HttpStatus.OK).json(user);
  }

}
