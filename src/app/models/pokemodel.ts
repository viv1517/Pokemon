import {pokeMoves} from './pokeMoves';

export class pokemodel{
    name: string;
    url: string;
    image: string;
    move: pokeMoves[];

    
    constructor(n: string, url: string, img: string = '', move: pokeMoves[] = []){
        this.name = n;
        this.url = url;
        this.image = img;
        this.move = move;
    }

    setImage(image: string){
        this.image = image;
    }
}