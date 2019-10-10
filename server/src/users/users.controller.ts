import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Param,
    NotFoundException,
    Query,
    Delete,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ValidateObjectId } from '../common/pipes/parse-int.pipes';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/rules.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('users')
    @UseGuards(RolesGuard)
    async findAll(@Res() res) {
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('user/:userID')
    @Roles('admin')
    @UseGuards(RolesGuard)
    async getuser(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
        const user = await this.usersService.getUser(userID);
        if (!user) { throw new NotFoundException('user does not exist!'); }
        return res.status(HttpStatus.OK).json(user);

    }

    @Delete('/delete')
    @UseGuards(RolesGuard)
    async deleteUser(@Res() res, @Query('userID', new ValidateObjectId()) userID) {
        const deletedUser = await this.usersService.deleteUser(userID);
        if (!deletedUser) {throw new NotFoundException('user does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'user has been deleted!',
            user: deletedUser,
        });
    }
}
