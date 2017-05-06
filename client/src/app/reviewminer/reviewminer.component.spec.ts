import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewminerComponent } from './reviewminer.component';

describe('ReviewminerComponent', () => {
  let component: ReviewminerComponent;
  let fixture: ComponentFixture<ReviewminerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewminerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
