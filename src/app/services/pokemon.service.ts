import { Injectable } from '@angular/core';
import { Observable,map, of } from 'rxjs';
import pokeData from "../../pokemon.json";
import { Pokemon } from '../pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  getAll(){
    return of(pokeData);
  }

  getById(id: number){
    return of(pokeData).pipe(map(all => all.find(p => p.id == id)))
  }

  
}
