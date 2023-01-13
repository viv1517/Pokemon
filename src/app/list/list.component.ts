import { Pokemon } from '../pokemon';
import { Component, getNgModuleById, Input } from '@angular/core';
import { PokemonService } from "../services/pokemon.service";
import { pokemodel } from '../models/pokemodel';
import { paginatedPokeModel, pokedeets } from '../models/pokedeets';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  pokemonPage?: paginatedPokeModel;
  paginationData!: {nextLink?: string, prevLink?: string, currentPage: number};
  constructor(public pokeSvc: PokemonService, 
              private route: ActivatedRoute){
    
  }
  displayDetails(id: number){
    return this.pokeSvc.getById(id);
  }
  
  ngOnInit(){
    let pageNum = Number(this.route.snapshot.queryParamMap.get("page") ?? "1");
    this.paginationData = {currentPage: pageNum}
    this.loadData(pageNum);
    
  }

  loadNext(){
    if (this.pokemonPage?.currentPage == 52){
      return;
    }
    this.paginationData.currentPage += 1;
    this.loadData(this.pokemonPage!.currentPage+1, this.pokemonPage?.limit)
  }

  loadPrev(){
    if (this.pokemonPage?.currentPage == 1){
      return;
    }
    this.paginationData.currentPage -= 1;
    this.loadData(this.pokemonPage!.currentPage-1, this.pokemonPage?.limit)
  }

  loadData(page?: number, limit?: number){
    this.pokeSvc.getPokemon(page, limit).subscribe(pokemonPage => {
      this.pokemonPage = pokemonPage
      pokemonPage.pokeList.forEach(pokemon => {
        
        this.pokeSvc.getImages(pokemon.name).subscribe(image => {
          console.log(pokemon);
          
          pokemon.setImage(image)
        });
      })
    });
    
  }
}
