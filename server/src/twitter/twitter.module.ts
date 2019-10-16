import { Module } from '@nestjs/common';
import { TwitterController } from './twitter.controller';
import { TwitterService } from './twitter.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetSchema } from './schemas/tweet.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Tweet', schema: TweetSchema }])],
    controllers: [ TwitterController ],
    providers: [ TwitterService ],
})
export class TwitterModule {}
