import { Component, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../pokemon';
import pokeData from "../../pokemon.json";
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {
  public poke: Pokemon | undefined;
  constructor(public pokeSvc: PokemonService,
             private route: ActivatedRoute,
             private location: Location){
  }
  ngOnInit(): void {
    this.getPoke();
  }

  getPoke(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokeSvc.getById(id)
    .subscribe(poke => this.poke = poke);
  }

  goBack(){
    this.location.back();
  }

  // this.id$ = route.params.pipe(
  //   map((p) => p.id),
  //   tap((p) => {
  //     this.class = p;
  //   })
  // );
 
}
