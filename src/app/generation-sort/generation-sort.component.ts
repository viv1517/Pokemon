import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-generation-sort',
  templateUrl: './generation-sort.component.html',
  styleUrls: ['./generation-sort.component.scss']
})
export class GenerationSortComponent {

  constructor(public pokeSvc: PokemonService){}


  genNames:string[] = [];
  readyToLoad: boolean = false;
  generation: string ='';
  genList!: any;
  pokeName: string = '';

  onGenSelect(gen: string): void{
    this.genNames = [];
    this.readyToLoad=false;
    this.generation = gen;
    this.genList = this.pokeSvc.filterByGen(gen).subscribe((name:any) =>{
        console.log("name", name)
         name.pokemonOfType.forEach((name:any) => {
           this.genNames.push(name);
         })
        console.log("name",name)
       })
    
    console.log("genNames", this.genNames);
  }


  onNameSelected(name:string): void{
    this.pokeName = name;
    this.readyToLoad=true;
  }
}
  