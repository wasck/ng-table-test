import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export interface Pokemon {
  name: string;
}

interface PageResult {
  count: number;
  results: Array<Pokemon>
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemons$: BehaviorSubject<Array<Pokemon>>;
  private readonly AMOUNT_OF_POKEOMON: number;
  private readonly POKEOMON_API: string;
  
  constructor(
    private httpClient: HttpClient
  ) {
    this.AMOUNT_OF_POKEOMON = 20;
    this.POKEOMON_API = "https://pokeapi.co/api/v2/pokemon/";
    
    this.pokemons$ = new BehaviorSubject<Array<Pokemon>>([]);
    this.initializePokemon(this.AMOUNT_OF_POKEOMON);
  }

  public get pokemon(): Observable<Array<Pokemon>> {
    return this.pokemons$.asObservable();
  }

  private initializePokemon(amount: number): void {
    const params = new HttpParams()
      .set('limit', amount);

    this.httpClient.get<PageResult>(this.POKEOMON_API, { params })
      .pipe(take(1))
      .subscribe(
        (pageResult: PageResult) => this.pokemons$.next(pageResult.results)
      );
  }
}
