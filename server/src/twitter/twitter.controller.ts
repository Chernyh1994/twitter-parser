import { Controller, HttpStatus, Get, Res, Body, Post } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { CreateTweetDto } from './dto/create-tweet';

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
        const users = await this.twitterService.findAllTweet();
        return res.status(HttpStatus.OK).json(users);
    }
}
