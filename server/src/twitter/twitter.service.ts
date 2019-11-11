import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as Twitter from 'twitter';
import { Tweet } from './interfaces/tweet.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTweetDto } from './dto/create-tweet';
import { ApiTwitterDto } from './dto/twitter-api';
import { CreateDataDto } from './dto/twitter-data';

@Injectable()
export class TwitterService {
    client: any;
    params: any;

    constructor(@InjectModel('Tweet') private readonly tweetModel: Model<Tweet>) {}

    async addApiTwitter(apiTwitterDto: ApiTwitterDto): Promise<object> {
        return this.client = new Twitter(apiTwitterDto);
    }

    async addDataTwitter(createDataDto: CreateDataDto): Promise<object> {
        return this.params = createDataDto;
    }

    async addNewTweets(createTweetDto: CreateTweetDto): Promise<object> {
        const tweets: any = await this.client.get('search/tweets', this.params);
        return await Promise.all(
            tweets.statuses.map(async (tweet: any) => {
                const newTweet: any = new this.tweetModel(createTweetDto);
                newTweet.text = tweet.text;
                newTweet.username = tweet.user.name;
                newTweet.retweetCount = tweet.retweet_count;
                newTweet.favoriteCount = tweet.favorite_count;
                newTweet.profileImages = tweet.user.profile_image_url_https;
                newTweet.save();
            }),
        );
    }

    async findAllTweet(): Promise<Tweet[]> {
        return await this.tweetModel.find().exec();
    }

    async removeTweet(tweetID: string): Promise<object> {
        const removeTweet: object = await this.tweetModel.findByIdAndDelete(tweetID);
        return removeTweet;
    }
}
