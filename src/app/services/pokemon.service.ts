import { Injectable } from '@angular/core';
import { Observable, map, of, zip, concatMap, tap } from 'rxjs';
import pokeData from "../../pokemon.json";
import { Pokemon } from '../pokemon';
import { HttpClient } from '@angular/common/http';
import { pokemodel } from '../models/pokemodel';
import { NgFor } from '@angular/common';
import { Location } from '@angular/common';
import { paginatedMoveModel, paginatedPokeModel, pokedeets, pokeTypeList } from '../models/pokedeets';
import { pokeMoves } from '../models/pokeMoves';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseURL: string = 'https://pokeapi.co/api/v2'

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
    return this.http.get('https://pokeapi.co/api/v2/pokemon', { params: { offset, limit } }).pipe(
      concatMap((data:any) => {
        return this.getManySprites(data.results).pipe(map(pokemon => {
          data.result = pokemon;
          return data;
        }));
      }),
      map((data: any) => {
        let pokemon = data.results.map((current: any) => {
          return new pokemodel(current.name, current.url, current.img);
        })
        return new paginatedPokeModel(pokemon, page, data.count, limit)

      }))
    
  }

  //returns the combined image with the name and url
  getManySprites(pokeList:any[]): Observable<any[]>{
    return zip(...pokeList.map(pokemon => {
      return this.getImages(pokemon.name).pipe(map(spriteURL => {
        pokemon.img = spriteURL
        return pokemon;
      }))
    }));
  }

  getDetails(name: string): Observable<pokedeets> {
    let pokedeet: pokedeets;
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
      concatMap((item:any) => {
        return this.getMoves(item.moves).pipe(map(move => {
          console.log("item", item)
          console.log("new move", move)
          item.moves = move;
          return item;
        }
        ));
      }),
      map((item: any) => {
        let types: string[] = [];
        item.types.forEach((type:any) =>{
          types.push(type.type.name);
        })
        let tempPokeDeet = new pokedeets(item.height, item.name, item.weight, item.id, item.sprites.front_shiny, [], types);
        item.moves.forEach((move:any) =>{
          const moves = new pokeMoves(move.accuracy, move.power, move.name);
          tempPokeDeet.move.push(moves);
        })
        return tempPokeDeet;
      })
    )
  }

  getMoves(moves:any[]){
    return zip(moves.map((move:any) =>{
      console.log("Move", move)
      return this.getManyMove(move);
      
    }))
  }

  getManyMove(move:any){
    return this.http.get(`https://pokeapi.co/api/v2/move/${move.move.name}`);
  }

  getImages(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(map((item:any) => {
    
      let tempPokeDeet = new pokedeets(item.height, item.name, item.weight, item.id, item.sprites.front_shiny);
      return tempPokeDeet.image;
    }))
    // return this.getDetails(name).pipe(map(pokemon => pokemon.image));
    
  }

  filterByType(type: string) {
    return this.http.get(`${this.baseURL}/type/${type}`).pipe(map((item: any) => {
      let pokeList = new pokeTypeList();
      item.pokemon.forEach((pokemon: any) => {
        pokeList.pokemonOfType?.push(pokemon.pokemon.name);
      })
      return pokeList;
    }))


  }

  getTypes(type:string){
    let names: string[] = [];
    return this.filterByType(type);

  }

  getGeneration(generation: string){
    let names: string[] = [];
  }

  filterByGen(gen:string){
    return this.http.get(`https://pokeapi.co/api/v2/generation/${gen}`).pipe(map((item:any) =>{
      let pokeList = new pokeTypeList();
      console.log("item", item.pokemon_species[0].name);
      item.pokemon_species.forEach((pokemon:any) => {
        console.log("pokemon", pokemon)
        pokeList.pokemonOfType?.push(pokemon.name);
      })
      return pokeList;
    }));
  }
  
}
