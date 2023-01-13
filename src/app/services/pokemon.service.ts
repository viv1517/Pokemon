import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import pokeData from "../../pokemon.json";
import { Pokemon } from '../pokemon';
import { HttpClient } from '@angular/common/http';
import { pokemodel } from '../models/pokemodel';
import { NgFor } from '@angular/common';
import { Location } from '@angular/common';
import { paginatedPokeModel, pokedeets } from '../models/pokedeets';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient, private location: Location) { }

  getAll() {
    return this.getPokemon;
    // return of(pokeData);
  }

  getById(id: number) {
    return of(pokeData).pipe(map(all => all.find(p => p.id == id)))
  }
  getPokemon(page: number = 1, limit: number = 20): Observable<paginatedPokeModel> {
    let pokeList: pokemodel[] = [];
    let offset = (page - 1) * limit
    return this.http.get('https://pokeapi.co/api/v2/pokemon', { params: { offset, limit } }).pipe(map((data: any) => {
      console.log(data);
      let pokemon = data.results.map((current: any) => {
        console.log(current);
        return new pokemodel(current.name, current.url);
      })
      return new paginatedPokeModel(pokemon, page, data.count, limit)





    })
    )
    // return of(pokeList);
  }

  getDetails(name: string): Observable<pokedeets> {
    let pokedeet: pokedeets;
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
      map((item: any) => {
        console.log(item.sprites.front_shiny)
        return new pokedeets(item.height, item.name, item.weight, item.id, item.sprites.front_shiny)
      }
      )
    )

  }

  getImages(name: string) {
    return this.getDetails(name).pipe(map(pokemon => pokemon.image))
  }



}
