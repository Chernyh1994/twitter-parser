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
            access_token_secret: ''
        });


        // this.params = {
        //     q: '',
        //     geocode: '47.857589,35.104832,10km',
        //     count: 1,
        //     // result_type: 'popular',
        // };
    }

    async findAllTweet(): Promise<Tweet[]> {
        return await this.tweetModel.find().exec();
    }

    async addNewTweets(createTweetDto: CreateTweetDto): Promise<any> {

        const tweets = await this.client.get('search/tweets', createTweetDto );

        return await Promise.all(
            tweets.statuses.map(async (tweet) => {
                const newTweet = await this.tweetModel(createTweetDto);
                newTweet.text = tweet.text;
                newTweet.username = tweet.user.name;
                newTweet.retweetCount = tweet.retweet_count;
                newTweet.favoriteCount = tweet.favorite_count;
                newTweet.profileImages = tweet.user.profile_image_url_https;

                newTweet.save();
                console.log(newTweet)
            }),
        );
    }

    async removeTweet(tweetID): Promise<any> {
        const removeTweet = await this.tweetModel
            .findByIdAndRemove(tweetID, { useFindAndModify: false })
        return removeTweet;
    }
}
