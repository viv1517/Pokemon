import { Pokemon } from '../pokemon';
import { Component, getNgModuleById, Input } from '@angular/core';
import { PokemonService } from "../services/pokemon.service";
import { pokemodel } from '../models/pokemodel';
import { pokedeets } from '../models/pokedeets';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  pokeList: pokemodel[] = [];
  constructor(public pokeSvc: PokemonService){
    
  }
  displayDetails(id: number){
    return this.pokeSvc.getById(id);
  }
  
  ngOnInit(){
    this.pokeList = [];
    this.pokeSvc.getPokemon().subscribe(pokeList => {
      this.pokeList = pokeList
      pokeList.forEach(pokemon => {
        
        this.pokeSvc.getImages(pokemon.name).subscribe(image => {
          console.log(pokemon);
          
          pokemon.setImage(image)
        });
      })
    });
    
  }
}
