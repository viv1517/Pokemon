import { Pokemon } from '../pokemon';
import { Component, ComponentFactoryResolver, getNgModuleById, Input } from '@angular/core';
import { PokemonService } from "../services/pokemon.service";
import { pokemodel } from '../models/pokemodel';
import { paginatedPokeModel, pokedeets } from '../models/pokedeets';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, map, Subscription, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  pokemonPage?: paginatedPokeModel;
  pokemonPageSub!: Subscription;
  unsubscribe$ = new Subject<void>();
  // pokemonPage$!: Subject<paginatedPokeModel>;
  paginationData!: {nextLink?: string, prevLink?: string, currentPage: number};
  constructor(public pokeSvc: PokemonService, 
              private route: ActivatedRoute,
              private router: Router){
    
  }
  displayDetails(id: number){
    return this.pokeSvc.getById(id);
  }
  
  ngOnInit(){
    let pageNum = Number(this.route.snapshot.queryParamMap.get("page") ?? "1");
    this.paginationData = {currentPage: pageNum};
    this.loadData(pageNum);
    
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
    this.router.navigate(['.'], {queryParams: {page}});

    this.pokemonPageSub = this.pokeSvc.getPokemon(page, limit).pipe(takeUntil(this.unsubscribe$)).subscribe(pokemonPage => {
      this.pokemonPage = pokemonPage
      
    });
    
  }

}
