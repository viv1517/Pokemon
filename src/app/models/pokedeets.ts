import { pokemodel } from "./pokemodel";
import { pokeMoves } from "./pokeMoves";

export class pokedeets{
    height: number;
    name: string;
    weight: number;
    id: number;
    image: string;
    move: pokeMoves[];
    type: string[];
    constructor(height: number, name: string, weight: number, id: number, image: string, move: pokeMoves[] = [], type: string[] = []){
        this.height = height;
        this.name = name;
        this.weight = weight;
        this.id = id;
        this.image = image;
        this.move = move;
        this.type = type;
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

export class paginatedMoveModel{
    move:pokeMoves;
    currentPage: number;
    count: number;
    limit: number;
    constructor(move:pokeMoves, currentPage: number, count: number, limit: number){
        this.move = move;
        this.currentPage = currentPage;
        this.count = count;
        this.limit = limit;
    }
}

export class pokeTypeList{
    pokemonOfType?: string[];

    constructor(pokemonOfType: string[] = []){
        this.pokemonOfType = pokemonOfType;
    }
}

export class pokeGenList{
    pokemonOfGen?: string[];

    constructor(pokemonOfType: string[] = []){
        this.pokemonOfGen = pokemonOfType;
    }
}