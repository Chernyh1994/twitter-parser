import { Controller, Get, Res, HttpStatus, Param, NotFoundException,
    Post, Body, Query, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ValidateObjectId } from '../sharedpipes/pipes/validate-object-id.pipes';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('users')
    async getUsers(@Res() res) {
        const users = await this.usersService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('user/:userID')
    async getuser(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
        const user = await this.usersService.getUser(userID);
        if (!user) { throw new NotFoundException('user does not exist!'); }
        return res.status(HttpStatus.OK).json(user);

    }

    @Post('/user')
    async addUser(@Res() res, @Body() createUserDto: CreateUserDto) {
        const newUser = await this.usersService.addUser(createUserDto);
        return res.status(HttpStatus.OK).json({
            message: 'User has been submitted successfully!',
            user: newUser,
        });
    }

    @Put('/edit')
    async editUser(
        @Res() res,
        @Query('userID', new ValidateObjectId()) userID,
        @Body() createUserDto: CreateUserDto,
    ) {
        const editedUser = await this.usersService.editUser(userID, createUserDto);
        if (!editedUser) { throw new NotFoundException('user does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'user has been successfully updated',
            user: editedUser,
        });
    }

    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID', new ValidateObjectId()) userID) {
        const deletedUser = await this.usersService.deleteUser(userID);
        if (!deletedUser) {throw new NotFoundException('user does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'user has been deleted!',
            user: deletedUser,
        });
    }
}
