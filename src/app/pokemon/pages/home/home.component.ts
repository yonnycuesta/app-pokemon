import { Component, OnInit } from '@angular/core';
import { ImagePokemonComponent } from '../../components/image-pokemon/image-pokemon.component';
import { PokemonService } from '../../services/pokemon.service';
import { CardPokemonComponent } from '../../components/card-pokemon/card-pokemon.component';
import { PokemonResult } from '../../interfaces/pokemon-response';
import { Pokemon } from '../../interfaces/pokemon';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { PokemonType } from '../../interfaces/pokemon-type';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ImagePokemonComponent,
    CardPokemonComponent,
    NgxPaginationModule,
    FormsModule,
    FontAwesomeModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  pokemons: PokemonResult[] = [];
  page: number = 0;
  totalPokemons?: number;
  pokemonSelected?: Pokemon;
  // Filters
  filteredPokemons: PokemonResult[] = [];
  searchParam: string = '';
  showFilters: boolean = false;
  pokeTypes: any;
  selectedType: any;

  constructor(private readonly pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getPokemonLists();
    this.getPokemonByName('bulbasaur');
    this.getTypes();
  }

  /**
   * Get Pokemons Types
   */

  public getTypes() {
    this.pokemonService.getTypes().subscribe({
      next: (response) => {
        this.pokeTypes = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  // TODO: Obtener la lista de pokemones.
  public getPokemonLists() {
    if (this.searchParam == '') {
      this.pokemonService.getPokemons(7, this.page).subscribe({
        next: (response) => {
          this.totalPokemons = response.count;
          this.pokemons = response.results;
          this.filteredPokemons = response.results;
          this.filteredPokemons.map((pokemon: any) => {
            this.pokemonService.getByName(pokemon.name).subscribe({
              next: (resp) => {
                pokemon.types = resp.types.map((t: any) => t.type.name);
                pokemon.abilities = resp.abilities.map((a: any) => a.ability.name);
                pokemon.species = resp.species;
              },
              error: (error) => {
                console.log('getPokemonLists', error);
              }
            });
          });
        },
        error: (error) => {
          console.log('getPokemonLists', error);
        }
      });
    } else {
      this.filterByAny();
    }

  }

  public getPokemonByName(name: string) {
    const pname = name.toLowerCase();
    this.pokemonService.getByName(pname).subscribe({
      next: (response) => {
        this.pokemonSelected = response;
      },
      error: (error) => {
        console.log('getPokemonByName', error);
      }
    });
  }

  public getSelected($event: string) {
    this.getPokemonByName($event);
  }


  // TODO: Filtrar por tipo.
  public filterByType(type: string) {
    this.filteredPokemons = this.pokemons.filter((pokemon: any) => {
      if (pokemon) {
        return pokemon.types.includes(type);
      }
    });
  }
  // TODO: Filtrar por nombre y habilidad.
  public filterByAny() {
    this.filteredPokemons = this.pokemons.filter((pokemon) => {
      return pokemon.name.includes(this.searchParam.toLowerCase())
        || pokemon.abilities.includes(this.searchParam.toLowerCase());
    });
  }



  public resetFilters() { // Eliminar filtros.
    this.searchParam = '';
    this.selectedType = '';
    this.filteredPokemons = this.pokemons;
  }
}
