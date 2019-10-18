import * as mongoose from 'mongoose';

export const TweetSchema = new mongoose.Schema({
    text: String,
    username: String,
    retweetCount: Number,
    favoriteCount: Number,
    profileImages: String,
});
