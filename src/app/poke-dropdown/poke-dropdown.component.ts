import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pokeTypeList } from '../models/pokedeets';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-poke-dropdown',
  templateUrl: './poke-dropdown.component.html',
  styleUrls: ['./poke-dropdown.component.scss']
})
export class PokeDropdownComponent {
  type: string ='';
  typeList!: any;
  typeNames: string[] = [];
  types: string[] = []
  pokeName: string = '';
  readyToLoad: boolean = false;
  /////////////
  genNames:string[] = [];
  // readyToLoad: boolean = false;
  generation: string ='';
  genList!: any;
  genPokeName: string = '';
  namesToDispaly: string[] = [];
  

  constructor(public pokeSvc: PokemonService,
              private route: ActivatedRoute,
              private router: Router){}

  onTypeSelected(type:string): void {
    this.types = [];
    this.readyToLoad=false;
		this.type = type;
    this.typeList = this.pokeSvc.getTypes(this.type).subscribe((name:any) =>{
      name.pokemonOfType.forEach((name:any) => {
        this.types.push(name);
      })
    });
  
	}
  

  onNameSelected(name:string): void {
   this.pokeName = name;
   this.readyToLoad=true;
 }

  onGenSelect(gen: string): void{
    this.genNames = [];
    this.readyToLoad=false;
    this.generation = gen;
    this.genList = this.pokeSvc.filterByGen(gen).subscribe((name:any) =>{
        console.log("name", name)
        name.pokemonOfType.forEach((name:any) => {
          if (this.types.length > 0){
            if(Object.values(this.types).includes(name)){
              this.genNames.push(name);
              console.log("foundName", name);
            }
            if (name in this.types){
              console.log("In list", name);
              this.genNames.push(name);
            }
            else{
              console.log("Not in list", name)
            }
          }
          else{
            this.genNames.push(name);
          }
        })
        console.log("name",name)
      })
    
    console.log("genNames", this.genNames);
    this.namesToDispaly = this.genNames;
  }


}

