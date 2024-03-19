import { Component, Input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-pokemon.component.html',
  styleUrl: './image-pokemon.component.scss'
})
export class ImagePokemonComponent {

  @Input() pokemon?: Pokemon;
}
