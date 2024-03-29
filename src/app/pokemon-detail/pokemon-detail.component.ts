import { Component, createPlatform, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, map, of, zip, concatMap, tap, takeUntil, Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../pokemon';
import pokeData from "../../pokemon.json";
import { Location } from '@angular/common';
import { paginatedMoveModel, pokedeets } from '../models/pokedeets';
import { pokemodel } from '../models/pokemodel';
import { ListCardComponent } from '../list-card/list-card.component';
import { pokeMoves } from '../models/pokeMoves';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {
  pokedeet!: pokedeets;
  movePage!: paginatedMoveModel;
  name?:string = "";
  
  paginationData!: {nextLink?: string, prevLink?: string, currentPage: number};
  unsubscribe$ = new Subject<void>();
  constructor(public pokeSvc: PokemonService,
             private route: ActivatedRoute,
             private location: Location,
             private router: Router){
  }

  @Input()
  pokemon?: any = "";

  @Input()
  onDetailsPage?: boolean = true;

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    this.ngOnInit();
  }
  

  ngOnInit(): void {
    const page = this.route.snapshot.queryParamMap.get('page');
    let pokeList: Observable<pokedeets>;
    if (this.pokemon !== ""){
      console.log("pokemon 49",this.pokemon.pokeName)
      this.getPoke(this.pokemon.pokeName).subscribe(pokedeets => this.pokedeet = pokedeets);
    }
    else{
      console.log("here")
      this.getPoke().subscribe(pokedeets => this.pokedeet = pokedeets);
    }
    
  }


  getPoke(pokeName: string = ""):Observable<pokedeets>{
    let name = ""
    if (pokeName !== ""){
      name = pokeName
    }
    else{
      name = this.route.snapshot.paramMap.get('name') ?? "";
    }
    
    let list = this.pokeSvc.getDetails(name);
    return list;
  }

  goBack(){  
    this.location.back();
  }

  getColorPallate(type: any){
    if(!this.onDetailsPage){
      return "transparent";
    }
    if (type.length == 1){
      let color =  this.getColor(type[0]);
      return "linear-gradient(to bottom right, "+color + ", " + color+")";
    }
    return this.get2Colors(type);
  }
   getColor(type: string){
    if (type === "normal"){
      return "gray"
    }
    if (type === "psychic"){
      return "#F85888"
    }
    else if (type === "water"){
      return "	#6890F0"
    }
    else if (type === "flying"){
      return "#A890F0"
    }
    else if (type === "electric"){
      return "	#F8D030"
    }
    else if (type === "fairy"){
      return "	#EE99AC"
    }
    else if (type === "dragon"){
      return "#7038F8"
    }
    else if (type === "dark"){
      return "#705848"
    }
    else if (type === "bug"){
      return "#A8B820"
    }
    else if (type === "rock"){
      return "#B8A038"
    }
    else if (type === "ghost"){
      return "#705898"
    }
    else if (type === "steel"){
      return "#B8B8D0"
    }
    else if (type === "poison"){
      return "#A040A0"
    }
    else if (type === "fighting"){
      return "#C03028"
    }
    else if (type === "fire"){
      return "#F08030"
    }
    else if (type === "ice"){
      return "#98D8D8"
    }
    else if (type === "grass"){
      return "#78C850"
    }
    else if (type === "ground"){
      return "#E0C068"
    }
    else{
      return "#A8A878"
    }

    
   }


   get2Colors(type:any){
    let color1 = this.getColor(type[0])
    let color2 = this.getColor(type[1])
    return "linear-gradient(to bottom right, "+color1 + ", " + color2+")"
   }
  
  getMoves(){
    console.log("these are the moves", this.pokedeet.move);
  }
    
}
 

