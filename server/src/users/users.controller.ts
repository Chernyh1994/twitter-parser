import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Query,
    Delete,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { User } from './interfaces/user.interface';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('users')
    @UseGuards(RolesGuard)
    async findAll(@Res() res: any): Promise<User[]> {
        try {
            const users: object[] = await this.usersService.findAll();
            return res.status(HttpStatus.OK).json(users);
        } catch (error) {return error; }
    }

    @Delete('/delete')
    @UseGuards(RolesGuard)
    async deleteUser(@Res() res: any, @Query('userID') userID: string): Promise<User[]> {
        try {
            await this.usersService.deleteUser(userID);
            const users: object[] = await this.usersService.findAll();
            return res.status(HttpStatus.OK).json(users);
        } catch (error) {return error; }
    }
}
