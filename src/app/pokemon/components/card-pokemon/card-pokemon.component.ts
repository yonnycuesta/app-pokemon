import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonResult } from '../../interfaces/pokemon-response';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.scss'
})
export class CardPokemonComponent implements OnChanges {

  @Input() pData?: PokemonResult;
  id: string = '0';
  @Input() cSelected: boolean = false;

  @Output() onSelected = new EventEmitter<string>();

  ngOnChanges(): void {
    this.getInfo();
  }


  getInfo() {
    this.id = this.pData?.url.split('/')[6] || '0';
  }

}
