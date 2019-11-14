import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from '../users/interfaces/user.interface';

describe('UsersService', () => {
  let testingModule: TestingModule;
  let service: AuthService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useFactory: () => ({
            findByUsername: jest.fn(() => true),
            findByEmail: jest.fn(() => true),
            isValidEmail: jest.fn(() => true),
            isValidPassword: jest.fn(() => true),
            registration: jest.fn(() => true),
            login: jest.fn(() => true),
            user: jest.fn(() => true),
          }),
        },
      ],
    }).compile();
    service = testingModule.get(AuthService);
  });

  describe('findByUsername', () => {
    it('should return User', async () => {
      const username: string = 'name';
      await service.findByUsername(username);
      expect(service.findByUsername).toHaveBeenCalledWith(username);
    });
  });

  describe('findByEmail', () => {
    it('should return Email', async () => {
      const email: string = 'name@test.com';
      await service.findByEmail(email);
      expect(service.findByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('isValidEmail', () => {
    it('should return Email', async () => {
      const email: string = 'name@test.com';
      service.isValidEmail(email);
      expect(service.isValidEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('isValidPassword', () => {
    it('should return password', async () => {
      const password: string = 'password';
      service.isValidPassword(password);
      expect(service.isValidPassword).toHaveBeenCalledWith(password);
    });
  });

  describe('registration', () => {
    it('should create new User', async () => {
      const params: CreateUserDto = {
        firstName: 'test',
        lastName: 'test',
        username: 'test',
        email: 'test',
        password: 'test',
      };
      service.registration(params);
      expect(service.registration).toHaveBeenCalledWith(params);
    });
  });

  describe('user', () => {
    it('should return user', async () => {
      const params = [{test: 'test'}];
      service.user(params);
      expect(service.user).toHaveBeenCalledWith(params);
    });
  });

});
