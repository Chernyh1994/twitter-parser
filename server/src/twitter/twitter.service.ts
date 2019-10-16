import { Injectable } from '@nestjs/common';
import * as Twitter from 'twitter';

@Injectable()
export class TwitterService {
    client;
    params;

    constructor() {
        this.client = new Twitter( {
            consumer_key: '',
            consumer_secret: '',
            access_token_key: '',
            access_token_secret: '',
        });

        this.params = {
            q: 'akshay',
            count: 3,
            result_type: 'popular',
            geocode: {
                latitude: 50.450157,
                longitude: 30.533420,
                radius: '2km',
            },
        };
    }

    async getBla() {
        return await this.client.get('search/tweets', this.params, search);

        function search(error, tweets, responese) {
            if (error) {console.log('Error search'); }
            // console.log(tweets)
            tweets.statuses.forEach(tweet => {
                console.log("tweet: " + tweet.text,
                            "username: " + tweet.user.name,
                            "favoriteCount: " + tweet.favorite_count,
                            "retweetCount: " + tweet.retweet_count,
                            );
            });
        }
    }
}
