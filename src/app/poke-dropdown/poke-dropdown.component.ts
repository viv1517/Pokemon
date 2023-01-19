import { Component } from '@angular/core';
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

  constructor(public pokeSvc: PokemonService){}
  // ngOnInit(){
  //   let typeList = this.pokeSvc.filterByType("water").subscribe();
  //   console.log(typeList)
  // }

  onTypeSelected(type:string): void {
		this.type = type;
    this.typeList = this.pokeSvc.getTypes(this.type).subscribe((name:any) =>{
      name.pokemonOfType.forEach((name:any) => {
        this.types.push(name);
      })
    });
    console.log("type", this.types);
    this.readyToLoad=false;
	}

  getType(){
    console.log("type", this.type)
  }

  onNameSelected(name:string): void {
		this.pokeName = name;
    console.log("name", this.pokeName);
    this.readyToLoad=true;
	}

}
