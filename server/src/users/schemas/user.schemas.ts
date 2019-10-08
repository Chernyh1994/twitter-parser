import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    userId: String,
    roles: Array<string>(),
});
