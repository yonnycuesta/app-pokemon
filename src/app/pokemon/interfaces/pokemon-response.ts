export interface PokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
  types: string[];
  abilities: string[];
  species: Species;
}

export interface Species {
  name: string;
  url: string;
}
