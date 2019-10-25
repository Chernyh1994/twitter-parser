import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as Twitter from 'twitter';
import { Tweet } from './interfaces/tweet.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTweetDto } from './dto/create-tweet';
import { AppTwitterDto } from './dto/twitter-api';

@Injectable()
export class TwitterService {
    client;
    params;

    constructor(@InjectModel('Tweet') private readonly tweetModel: Model<Tweet>) {}

    async addApiTwitter(appTwitterDto: AppTwitterDto): Promise<any> {
        const apikeys = await appTwitterDto;
        return this.client = new Twitter(apikeys);
    }

    async addNewTweets(createTweetDto: CreateTweetDto): Promise<any> {
        console.log('dddddddddddddd', this.client)
        console.log('createTweetDtocreateTweetDtocreateTweetDto',createTweetDto)
        const tweets = await this.client.get('search/tweets', createTweetDto );
        return await Promise.all(
            tweets.statuses.map(async (tweet) => {
                const newTweet = await new this.tweetModel(createTweetDto);
                newTweet.text = tweet.text;
                newTweet.username = tweet.user.name;
                newTweet.retweetCount = tweet.retweet_count;
                newTweet.favoriteCount = tweet.favorite_count;
                newTweet.profileImages = tweet.user.profile_image_url_https;
                console.log(newTweet)
                newTweet.save();
            }),
        );
    }

    async findAllTweet(): Promise<Tweet[]> {
        return await this.tweetModel.find().exec();
    }

    async removeTweet(tweetID): Promise<any> {
        const removeTweet = await this.tweetModel
            .findByIdAndRemove(tweetID);
        return removeTweet;
    }
}
