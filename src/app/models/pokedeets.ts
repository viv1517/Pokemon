import { pokemodel } from "./pokemodel";
import { pokeMoves } from "./pokeMoves";

export class pokedeets{
    height: number;
    name: string;
    weight: number;
    id: number;
    image: string;
    move: pokeMoves[];
    constructor(height: number, name: string, weight: number, id: number, image: string, move: pokeMoves[] = []){
        this.height = height;
        this.name = name;
        this.weight = weight;
        this.id = id;
        this.image = image;
        this.move = move;
    }
}

export class paginatedPokeModel{
    pokeList: pokemodel[];
    currentPage: number;
    count: number;
    limit: number;

    constructor(pokeList: pokemodel[], currentPage: number, count: number, limit: number){
        this.pokeList = pokeList;
        this.currentPage = currentPage;
        this.count = count;
        this.limit = limit;
    }
}