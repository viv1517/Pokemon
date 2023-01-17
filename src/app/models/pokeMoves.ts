export class pokeMoves{
    name: string;
    accuracy: number;
    power: number;

    constructor(acc: number, power: number, name: string){
        this.name = name;
        this.accuracy = acc;
        this.power = power;
    }
}