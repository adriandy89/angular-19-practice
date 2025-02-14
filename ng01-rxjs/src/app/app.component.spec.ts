import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial options', () => {
    component.options$.subscribe((options) => {
      expect(options).toEqual({ r: 'red', g: 'green', b: 'blue' });
    });
  });

  it('should switch options', () => {
    component.switchOptions();
    component.options$.subscribe((options) => {
      expect(options).toEqual({ m: 'magenta', y: 'yellow', c: 'cyan' });
    });
    component.selectedKey$.subscribe((key) => {
      expect(key).toBe('y');
    });

    component.switchOptions();
    component.options$.subscribe((options) => {
      expect(options).toEqual({ r: 'red', g: 'green', b: 'blue' });
    });
    component.selectedKey$.subscribe((key) => {
      expect(key).toBe('b');
    });
  });

  it('should calculate sum correctly', () => {
    component.sum$.subscribe((sum) => {
      expect(sum).toBe(3);
    });
  });

  it('should increment a if sum is less than 10', async () => {
    await component.incrementA();
    component.a$.subscribe((a) => {
      expect(a).toBe(2);
    });
  });

  it('should not increment a if sum is 10 or more', async () => {
    component.a$.next(5);
    component.b$.next(5);
    await component.incrementA();
    component.a$.subscribe((a) => {
      expect(a).toBe(5);
    });
  });
});
