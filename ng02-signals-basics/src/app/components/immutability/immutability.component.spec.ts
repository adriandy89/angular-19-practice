import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmutabilityComponent } from './immutability.component';

describe('ImmutabilityComponent', () => {
  let component: ImmutabilityComponent;
  let fixture: ComponentFixture<ImmutabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmutabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmutabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
