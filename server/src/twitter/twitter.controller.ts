import {
    Controller,
    HttpStatus,
    Get,
    Res,
    Body,
    Post,
    Delete,
    Query,
} from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { CreateTweetDto } from './dto/create-tweet';
import { CreateDataDto } from './dto/twitter-data';
import { ApiTwitterDto } from './dto/twitter-api';
import { Tweet } from './interfaces/tweet.interface';

@Controller('twitter')
export class TwitterController {
    constructor(private twitterService: TwitterService) {}

    @Post('twitter')
    async addNewTweets(@Res() res: any, @Body() createTweetDto: CreateTweetDto): Promise<object[]> {
        try {
            const twitter: object = await this.twitterService.addNewTweets(createTweetDto);
            return res.status(HttpStatus.OK).json(twitter);
        } catch (error) {return error; }
    }

    @Post('api')
    async addApiTwitter(@Res() res: any, @Body() apiTwitterDto: ApiTwitterDto): Promise<object> {
        try {
            const api: object = await this.twitterService.addApiTwitter(apiTwitterDto);
            return res.status(HttpStatus.OK).json(api);
        } catch (error) {return error; }
    }

    @Post('twitterData')
    async addDataTwitter(@Res() res: any, @Body() createDataDto: CreateDataDto): Promise<object> {
        try {
            const dataTwitter: object = await this.twitterService.addDataTwitter(createDataDto);
            return res.status(HttpStatus.OK).json(dataTwitter);
        } catch (error) {return error; }
    }

    @Get('tweets')
    async findAllTweet(@Res() res: any): Promise<Tweet[]> {
        try {
            const tweets: object[] = await this.twitterService.findAllTweet();
            return res.status(HttpStatus.OK).json(tweets);
        } catch (error) {return error; }
    }

    @Delete('remove')
    async removeTweet(@Res() res: any, @Query('tweetID') tweetID: string): Promise<Tweet[]> {
        try {
            await this.twitterService.removeTweet(tweetID);
            const tweets: object[] = await this.twitterService.findAllTweet();
            return res.status(HttpStatus.OK).json(tweets);
        } catch (error) {return error; }
    }
}
