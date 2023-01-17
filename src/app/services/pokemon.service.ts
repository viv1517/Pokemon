import { Injectable } from '@angular/core';
import { Observable, map, of, zip, concatMap, tap } from 'rxjs';
import pokeData from "../../pokemon.json";
import { Pokemon } from '../pokemon';
import { HttpClient } from '@angular/common/http';
import { pokemodel } from '../models/pokemodel';
import { NgFor } from '@angular/common';
import { Location } from '@angular/common';
import { paginatedPokeModel, pokedeets } from '../models/pokedeets';
import { pokeMoves } from '../models/pokeMoves';

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
    return this.http.get('https://pokeapi.co/api/v2/pokemon', { params: { offset, limit } }).pipe(
      concatMap((data:any) => {
        console.log("data: ", data)
        return this.getManySprites(data.results).pipe(map(pokemon => {
          data.result = pokemon;
          return data;
        }));
      }),
      map((data: any) => {
        console.log("2nd data: ",data);
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
        console.log("url: ", spriteURL);
        pokemon.img = spriteURL
        return pokemon;
      }))
    }));
  }

  test(){
    console.log("hello");
    
  }

  getDetails(name: string): Observable<pokedeets> {
    let pokedeet: pokedeets;
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
      concatMap((item:any) => {
        return this.getMoves(item.moves).pipe(map(move => {
          item.moves = move;
          return item;
        }
        ));
      }),
      map((item: any) => {
        console.log("item: ",item)
        let tempPokeDeet = new pokedeets(item.height, item.name, item.weight, item.id, item.sprites.front_shiny);
        console.log("These moves: ", item.moves, "item: ", item);
        item.moves.forEach((move:any) =>{
          const moves = new pokeMoves(move.accuracy, move.power, move.name);
          tempPokeDeet.move.push(moves);
        })
        return tempPokeDeet;
      }
      )
    )
  }

  getMoves(moves:any[]){
    return zip(moves.map((move:any) =>{
      return this.getManyMove(move);
      
    }))
  }

  getManyMove(move:any){
    return this.http.get(`https://pokeapi.co/api/v2/move/${move.move.name}`);
  }

  getImages(name: string) {
    return this.getDetails(name).pipe(map(pokemon => pokemon.image));
    
  }


}
