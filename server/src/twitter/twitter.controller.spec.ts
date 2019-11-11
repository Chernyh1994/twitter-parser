import { Test, TestingModule } from '@nestjs/testing';
import { TwitterController } from './twitter.controller';
import { TwitterService } from './twitter.service';
import { response } from 'express';

describe('Users Controller', () => {
  let testingModule: TestingModule;
  let twitterController: TwitterController;
  let twitterService: TwitterService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [TwitterController],
      providers: [
        {
          provide: TwitterService,
          useFactory: () => ({
            addNewTweets: jest.fn(() => true),
            addDataTwitter: jest.fn(() => true),
            addApiTwitter: jest.fn(() => true),
            findAllTweet: jest.fn(() => true),
            removeTweet: jest.fn(() => true),
          }),
        },
      ],
    }).compile();
    twitterController = testingModule.get(TwitterController);
    twitterService = testingModule.get(TwitterService);
  });

  describe('addNewTweets', () => {
    it('should create new Tweets', async () => {
      const params = {
        text: 'test',
        username: 'test',
        retweetCount: 1,
        favoriteCount: 1,
        profileImages: 'test',
      };
      await twitterController.addNewTweets(response, params);
      expect(twitterService.addNewTweets).toHaveBeenCalledWith(params);
    });
  });

  describe('addApiTwitter', () => {
    it('should add to the API Twitter', async () => {
      const params = {
        consumer_key: 'test',
        consumer_secret: 'test',
        access_token_key: 'test',
        access_token_secret: 'test',
      };
      await twitterController.addApiTwitter(response, params);
      expect(twitterService.addApiTwitter).toHaveBeenCalledWith(params);
    });
  });

  describe('addDataTwitter', () => {
    it('should add to the data Twitter', async () => {
      const params = {
        q: 'test',
        count: 1,
        geocode: 'test',
      };
      await twitterController.addDataTwitter(response, params);
      expect(twitterService.addDataTwitter).toHaveBeenCalledWith(params);
    });
  });

  describe('findAll', () => {
    it('should return all Tweets', async () => {
      await twitterController.findAllTweet(response);
      expect(twitterService.findAllTweet).toHaveBeenCalled();
    });
  });

  describe('removeTweet', () => {
    it('should delete to the user', async () => {
      const params: string = 'tweetID';
      await twitterController.removeTweet(response, params);
      expect(twitterService.removeTweet).toHaveBeenCalledWith(params);
    });
  });
});

