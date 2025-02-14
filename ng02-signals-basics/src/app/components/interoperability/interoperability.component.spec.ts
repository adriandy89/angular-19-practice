import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteroperabilityComponent } from './interoperability.component';

describe('InteroperabilityComponent', () => {
  let component: InteroperabilityComponent;
  let fixture: ComponentFixture<InteroperabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteroperabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteroperabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
