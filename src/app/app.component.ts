import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public pokemon$: Observable<Array<Pokemon>>;

  constructor(
    private pokemonService: PokemonService
  ) {}

  public ngOnInit(): void {
    this.pokemon$ = this.pokemonService.pokemon;
  }
}
