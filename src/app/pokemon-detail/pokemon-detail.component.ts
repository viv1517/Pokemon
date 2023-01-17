import { Component, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../pokemon';
import pokeData from "../../pokemon.json";
import { Location } from '@angular/common';
import { pokedeets } from '../models/pokedeets';
import { pokemodel } from '../models/pokemodel';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {
  pokedeet: pokedeets | undefined;

  constructor(public pokeSvc: PokemonService,
             private route: ActivatedRoute,
             private location: Location,
             private router: Router){
  }
  ngOnInit(): void {
    const page = this.route.snapshot.queryParamMap.get('page');
    let pokeList: Observable<pokedeets>;
    this.getPoke().subscribe(pokedeets => this.pokedeet = pokedeets);
    
    
  }

  getPoke():Observable<pokedeets>{
    let name = this.route.snapshot.paramMap.get('name') ?? "";
    let list = this.pokeSvc.getDetails(name);
    return list;
  }

  goBack(){
    this.location.back();
  }




 
}
