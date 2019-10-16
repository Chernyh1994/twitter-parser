import { Controller, HttpStatus, Get, Res } from '@nestjs/common';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
    constructor(private twitterService: TwitterService) {}

    @Get('twitter')
    async Twit(@Res() res) {
        const twitter = await this.twitterService.getBla();
        return res.status(HttpStatus.OK).json(twitter);
    }
}
