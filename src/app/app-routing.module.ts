import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerationSortComponent } from './generation-sort/generation-sort.component';
import { ListComponent } from './list/list.component';
import { PokeDropdownComponent } from './poke-dropdown/poke-dropdown.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  {path: 'generation', component: GenerationSortComponent},
  {path: 'drop', component: PokeDropdownComponent},
  {path: 'list', component: ListComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full' },
  {path:'details/:name', component:PokemonDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
