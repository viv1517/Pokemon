import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pokeMoves } from '../models/pokeMoves';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-move-carousel',
  templateUrl: './move-carousel.component.html',
  styleUrls: ['./move-carousel.component.scss']
})
export class MoveCarouselComponent {
  constructor(public pokeSvc: PokemonService,
              private route: ActivatedRoute,
              private router: Router){

  }

  @Input()
  moves!: pokeMoves[];

  @Input()
  current: number = 0;

  @Input()
  last!:number;

  loadNext(){
    if (this.current == this.moves.length - 1){
      return;
    }
    this.current += 1;
  }

  loadPrev(){
    if (this.current == 0){
      return;
    }
    this.current -= 1;
  }
}
