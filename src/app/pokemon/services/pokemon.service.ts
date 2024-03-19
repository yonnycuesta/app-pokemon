import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PokemonResponse } from '../interfaces/pokemon-response';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonType } from '../interfaces/pokemon-type';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly url: string = environment.baseURL;

  constructor(private readonly _http: HttpClient) { }

  public getPokemons(limmit: number, offset: number): Observable<PokemonResponse> {
    return this._http.get<PokemonResponse>(`${this.url}/pokemon/?limit=${limmit}&offset=${offset}`).pipe(
      map((response: PokemonResponse) => {
        return response;
      })
    );
  }

  public getByName(name: string): Observable<Pokemon> {
    {
      return this._http.get<Pokemon>(`${this.url}/pokemon/${name}`).pipe(
        map((response: Pokemon) => {
          return response;
        })
      );
    }
  }

  public getTypes() {
    return this._http.get<PokemonType>('assets/data/types.json');
  }
}
