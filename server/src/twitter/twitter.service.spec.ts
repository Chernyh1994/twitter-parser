import { Test, TestingModule } from '@nestjs/testing';
import { TwitterService } from './twitter.service';
import { CreateTweetDto } from './dto/create-tweet';
import { ApiTwitterDto } from './dto/twitter-api';
import { CreateDataDto } from './dto/twitter-data';

describe('UsersService', () => {
  let testingModule: TestingModule;
  let service: TwitterService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TwitterService,
          useFactory: () => ({
            addApiTwitter: jest.fn(() => true),
            addDataTwitter: jest.fn(() => true),
            addNewTweets: jest.fn(() => true),
            findAllTweet: jest.fn(() => true),
            removeTweet: jest.fn(() => true),
          }),
        },
      ],
    }).compile();
    service = testingModule.get(TwitterService);
  });

  describe('addApiTwitter', () => {
    it('should return Api key Twitter', async () => {
      const params: ApiTwitterDto = {
        consumer_key: 'test',
        consumer_secret: 'test',
        access_token_key: 'test',
        access_token_secret: 'test',
      };
      await service.addApiTwitter(params);
      expect(service.addApiTwitter).toHaveBeenCalledWith(params);
    });
  });

  describe('addDataTwitter', () => {
    it('should return Twitter Api params', async () => {
      const params: CreateDataDto = {
        q: 'test',
        count: 1,
        geocode: 'test',
      };
      await service.addDataTwitter(params);
      expect(service.addDataTwitter).toHaveBeenCalledWith(params);
    });
  });

  describe('addNewTweets', () => {
    it('should return new Tweets', async () => {
      const params: CreateTweetDto = {
        text: 'test',
        username: 'test',
        retweetCount: 1,
        favoriteCount: 1,
        profileImages: 'test',
      };
      await service.addNewTweets(params);
      expect(service.addNewTweets).toHaveBeenCalledWith(params);
    });
  });

  describe('findAllTweet', () => {
    it('should return all Tweets', async () => {
      await service.findAllTweet();
      expect(service.findAllTweet).toHaveBeenCalled();
    });
  });

  describe('removeTweet', () => {
    it('should delete to the Tweet', async () => {
      const tweetID: string = 'qwlkeqwie3234Nkke66Fgew6i';
      await service.removeTweet(tweetID);
      expect(service.removeTweet).toHaveBeenCalledWith(tweetID);
    });
  });
});
