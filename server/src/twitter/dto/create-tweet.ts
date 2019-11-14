export class CreateTweetDto {
    readonly text: string;
    readonly username: string;
    readonly retweetCount: number;
    readonly favoriteCount: number;
    readonly profileImages: string;
}
