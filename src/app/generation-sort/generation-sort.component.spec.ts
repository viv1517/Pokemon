import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationSortComponent } from './generation-sort.component';

describe('GenerationSortComponent', () => {
  let component: GenerationSortComponent;
  let fixture: ComponentFixture<GenerationSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerationSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
