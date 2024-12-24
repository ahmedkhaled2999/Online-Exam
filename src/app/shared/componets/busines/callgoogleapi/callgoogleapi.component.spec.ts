import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallgoogleapiComponent } from './callgoogleapi.component';

describe('CallgoogleapiComponent', () => {
  let component: CallgoogleapiComponent;
  let fixture: ComponentFixture<CallgoogleapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallgoogleapiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallgoogleapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
