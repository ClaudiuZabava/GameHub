import { Game } from "./IGame.interface";

export class GameClass implements Game {
    gameId!: string;
    gameName!: string;
    gameGenre!: string;
    gameRelease!: string;
    gameAgeV!: string;
    storeLink!: string;
    gameDesc!: string;
    gameImage!: string;
    gameRating!: number[];
}
