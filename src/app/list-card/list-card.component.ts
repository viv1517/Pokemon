import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pokemodel } from '../models/pokemodel';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {
  @Input() 
  name!: string;
  @Input() 
  image!: string;
  @Input()
  isDetail!: boolean;

  pokemon!: pokemodel;

  constructor(public pokeSvc: PokemonService, 
    private route: ActivatedRoute,
    private router: Router){
  }

  getBackground(){
    if (this.isDetail){
      return "transparent";
    }
    return "white;"
  }

  getColor(){
    if (this.isDetail){
      return "rgb(254, 243, 47)";
    }
    return ""
  }

}
