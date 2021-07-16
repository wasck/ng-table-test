import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PokemonComponent } from './dialogs/pokemon/pokemon.component';
import { Pokemon, PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public pokemons$: Observable<Array<Pokemon>>;
  public displayedColumns: Array<string>;

  constructor(
    private pokemonService: PokemonService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.pokemons$ = this.pokemonService.pokemon;
    this.initializeTableData();
  }

  public add(): void {
    const dialogRef = this.dialog.open(PokemonComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pokemonService.add(result.pokemon);
      }
    });
  }

  public onRowClick(pokemon: Pokemon, index: number): void {
    const dialogRef = this.dialog.open(PokemonComponent, {
      data: {pokemon, index}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pokemonService.update(result.pokemon, result.index);
      }
    });
  }

  private initializeTableData(): void {
    this. displayedColumns = ['id', 'name'];
  }
}
