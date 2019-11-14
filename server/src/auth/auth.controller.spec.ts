import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { response, request } from 'express';

describe('Users Controller', () => {
  let testingModule: TestingModule;
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: () => ({
            registration: jest.fn(() => true),
            login: jest.fn(() => true),
            user: jest.fn(() => true),
          }),
        },
      ],
    }).compile();
    authController = testingModule.get(AuthController);
    authService = testingModule.get(AuthService);
  });

  describe('registration', () => {
    it('should create new User', async () => {
      const params = {
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        email: 'email',
        password: 'password',
      };
      await authController.registration(response, params);
      expect(authService.registration).toHaveBeenCalledWith(params);
    });
  });

  describe('login', () => {
    it('should return User', async () => {
      const params = {
        username: 'username',
        password: 'password',
      };
      await authController.login(response, params);
      expect(authService.login).toHaveBeenCalledWith(params);
    });
  });

  describe('user', () => {
    it('should return User', async () => {
      await authController.user(request, response);
      expect(authService.user).toHaveBeenCalled();
    });
  });
});
