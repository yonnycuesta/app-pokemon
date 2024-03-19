import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePokemonComponent } from './image-pokemon.component';

describe('ImagePokemonComponent', () => {
  let component: ImagePokemonComponent;
  let fixture: ComponentFixture<ImagePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagePokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
