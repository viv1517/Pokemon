export class pokemodel{
    name: string;
    url: string;
    image: string;

    
    constructor(n: string, url: string){
        this.name = n;
        this.url = url;
        this.image = '';
    }

    setImage(image: string){
        this.image = image;
    }
}