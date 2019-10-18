export class CreateTweetDto {
    readonly text: string;
    readonly username: string;
    readonly retweetCount: number;
    readonly favoriteCount: number;
    readonly profileImages: string;
    readonly q: string;
    readonly count: number;
    readonly geocode: string;
}
