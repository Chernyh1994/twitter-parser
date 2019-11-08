import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { response } from 'express';

describe('Users Controller', () => {
  let testingModule: TestingModule;
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useFactory: () => ({
            findAll: jest.fn(() => true),
            deleteUser: jest.fn(() => true),
          }),
        },
      ],
    }).compile();
    usersController = testingModule.get(UsersController);
    usersService = testingModule.get(UsersService);
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      await usersController.findAll(response);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should delete to the user', async () => {
      const params: string = 'userID';
      await usersController.deleteUser(response, params);
      expect(usersService.deleteUser).toHaveBeenCalledWith(params);
    });
  });
});
