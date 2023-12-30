import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { JwtService } from 'src/app/service/jwt.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let jwtServiceMock: jest.Mocked<JwtService>;

  beforeEach(
    waitForAsync(() => {
      jwtServiceMock = {
        login: jest.fn(),
      } as unknown as jest.Mocked<JwtService>;

      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [ReactiveFormsModule, RouterTestingModule],
        providers: [{ provide: JwtService, useValue: jwtServiceMock }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty fields', () => {
    expect(component.loginForm?.get('email')?.value).toBe('');
    expect(component.loginForm?.get('password')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.loginForm?.valid).toBeFalsy();
  });

  it('should mark form as valid when fields are filled', () => {
    component.loginForm?.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(component.loginForm?.valid).toBeTruthy();
  });

  it('should call submitForm method on form submission', () => {
    const submitFormSpy = jest.spyOn(component, 'submitForm');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('ngSubmit'));
    fixture.detectChanges();
    expect(submitFormSpy).toHaveBeenCalled();
  });

  it('should call service login method and navigate on successful login', () => {
    const response = { jwt: 'fakeToken' };
    jwtServiceMock.login.mockReturnValue(of(response));

    const navigateSpy = jest.spyOn((component as any).router, 'navigateByUrl');

    component.loginForm?.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.submitForm();

    expect(jwtServiceMock.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(localStorage.getItem('jwt')).toBe('fakeToken');
    expect(navigateSpy).toHaveBeenCalledWith('/rmdashboard');
  });
});
