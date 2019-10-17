import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as Twitter from 'twitter';
import { Tweet } from './interfaces/tweet.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTweetDto } from './dto/create-tweet';

@Injectable()
export class TwitterService {
    client;
    params;

    constructor(@InjectModel('Tweet') private readonly tweetModel: Model<Tweet> ) {
        this.client = new Twitter( {
            consumer_key: '',
            consumer_secret: '',
            access_token_key: '',
            access_token_secret: '',
        });

        this.params = {
            q: 'akshay',
            count: 10,
            result_type: 'popular',
            geocode: {
                latitude: 50.450157,
                longitude: 30.533420,
                radius: '2km',
            },
        };
    }

    async findAllTweet(): Promise<Tweet[]> {
        return await this.tweetModel.find().exec();
    }

    async getBla(createTweetDto: CreateTweetDto): Promise<any> {

        const tweets = await this.client.get('search/tweets', this.params);
        return await Promise.all(
            tweets.statuses.map(async (tweet) => {
                const newTweet = await this.tweetModel(createTweetDto);
                newTweet.text = tweet.text;
                newTweet.username = tweet.user.name;
                newTweet.retweetCount = tweet.retweet_count;
                newTweet.favoriteCount = tweet.favorite_count;
                newTweet.save();
            }),
        );
    }
}
