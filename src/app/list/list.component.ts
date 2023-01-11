import { Pokemon } from '../pokemon';
import { Component, getNgModuleById, Input } from '@angular/core';
import { PokemonService } from "../services/pokemon.service";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(public pokeSvc: PokemonService){
    
  }
  displayDetails(id: number){
    return this.pokeSvc.getById(id);
  }
}
