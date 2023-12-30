import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
 
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    });
 
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
 
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
 
  it('should have a valid title', () => {
    expect(component.title).toBeTruthy();
    expect(typeof component.title).toBe('string');
    expect(component.title.length).toBeGreaterThan(10);
  });
 
  it('should have the correct title', () => {
    expect(component.title).toEqual('CustomerSessionPortal');
  });
 
});