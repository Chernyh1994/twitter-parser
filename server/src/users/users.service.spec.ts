import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let testingModule: TestingModule;
  let service: UsersService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
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
    service = testingModule.get(UsersService);
  });

  describe('findAll', () => {
    it('should return all Users', async () => {
      await service.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should delete to the user', async () => {
      const params: string = 'qwlkeqwie3234Nkke66Fgew6i';
      await service.deleteUser(params);
      expect(service.deleteUser).toHaveBeenCalledWith(params);
    });
  });
});
