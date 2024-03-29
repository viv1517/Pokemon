import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';
import { ListCardComponent } from './list-card/list-card.component';
import { MoveCarouselComponent } from './move-carousel/move-carousel.component';
import { PokeDropdownComponent } from './poke-dropdown/poke-dropdown.component';
import { GenerationSortComponent } from './generation-sort/generation-sort.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    PokemonDetailComponent,
    PaginationComponent,
    ListCardComponent,
    MoveCarouselComponent,
    PokeDropdownComponent,
    GenerationSortComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
