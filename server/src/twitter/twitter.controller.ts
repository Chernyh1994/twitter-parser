import { Controller, HttpStatus, Get, Res, Body, Post, Delete, Query, NotFoundException } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { CreateTweetDto } from './dto/create-tweet';
import { ValidateObjectId } from 'src/common/pipes/parse-int.pipes';

@Controller('twitter')
export class TwitterController {
    constructor(private twitterService: TwitterService) {}

    @Post('twitter')
    async Tweet(@Res() res,   @Body() createTweetDto: CreateTweetDto) {
        const twitter = await this.twitterService.addNewTweets(createTweetDto);
        return res.status(HttpStatus.OK).json(twitter);
    }

    @Get('tweets')
    async findAll(@Res() res) {
        const tweets = await this.twitterService.findAllTweet();
        return res.status(HttpStatus.OK).json(tweets);
    }

    @Delete('remove')
    async removeTweet(@Res() res, @Query('tweetID', new ValidateObjectId()) tweetID) {
        const removeTweet = await this.twitterService.removeTweet(tweetID);
        const tweets = await this.twitterService.findAllTweet();
        if (!removeTweet) {throw new NotFoundException('tweet does not exist!'); }
        return res.status(HttpStatus.OK).json(tweets);
    }
}
