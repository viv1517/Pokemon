import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveCarouselComponent } from './move-carousel.component';

describe('MoveCarouselComponent', () => {
  let component: MoveCarouselComponent;
  let fixture: ComponentFixture<MoveCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
