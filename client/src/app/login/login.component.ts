import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public createdForm: FormGroup;
  public responseErrors: string;
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(): void {
    this.createdForm = this.formBuilder.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(5)]),
        ],
      },
      { updateOn: 'submit' }
    );
  }

  login(e: SubmitEvent) {
    this.createdForm.markAllAsTouched();
    this.createdForm.updateValueAndValidity();
    if (this.createdForm.valid) {
      this.loginService
        .login(
          this.createdForm.controls['email'].value,
          this.createdForm.controls['password'].value
        )
        .subscribe(
          (res: any) => {
            this.responseErrors = '';
            this.loginService.user = res.data;
            this.loginService.logged = true;
            this.loginService.persistUser();
          },
          (err: any) => {
            console.log(err.error.error);
            this.responseErrors = err.error.error;
          }
        );
      this.createdForm.reset();
    }
  }
}
