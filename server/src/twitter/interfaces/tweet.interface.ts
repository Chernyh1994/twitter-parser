import { Document } from 'mongoose';

export interface Tweet extends Document {
     text: string;
     username: string;
     retweetCount: number;
     favoriteCount: number;
}
