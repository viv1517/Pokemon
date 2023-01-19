import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeDropdownComponent } from './poke-dropdown.component';

describe('PokeDropdownComponent', () => {
  let component: PokeDropdownComponent;
  let fixture: ComponentFixture<PokeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
