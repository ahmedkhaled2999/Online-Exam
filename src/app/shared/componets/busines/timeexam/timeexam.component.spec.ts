import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeexamComponent } from './timeexam.component';

describe('TimeexamComponent', () => {
  let component: TimeexamComponent;
  let fixture: ComponentFixture<TimeexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeexamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
