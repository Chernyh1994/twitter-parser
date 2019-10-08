import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Param,
    NotFoundException,
    Post,
    Body,
    Query,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ValidateObjectId } from '../common/pipes/parse-int.pipes';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/rules.decorator';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('users')
    @UseGuards(RolesGuard)
    @Roles('admin')
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

    @Post('/user')
    @UseGuards(RolesGuard)
    async createNewUser(
        @Res() res,
        @Body() createUserDto: CreateUserDto) {
        const newUser = await this.usersService.createNewUser(createUserDto);
        return res.status(HttpStatus.CREATED).json({
            message: 'User has been submitted successfully!',
            user: newUser,
        });
    }

    @Delete('/delete')
    @Roles('admin')
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
