import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IUser {
  name: string;
  surname: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl: string = 'http://localhost:3001/api/login';
  user: IUser = JSON.parse(localStorage.getItem('Authenticated user')) || {
    name: '',
    surname: '',
    id: '',
  };
  logged: boolean = JSON.parse(localStorage.getItem('logged')) || false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(this.loginUrl, { email, password });
  }

  persistUser() {
    localStorage.setItem('Authenticated user', JSON.stringify(this.user));
    localStorage.setItem('logged', JSON.stringify(this.logged));
  }

  logout(): void {
    localStorage.removeItem('Authenticated user');
    localStorage.removeItem('logged');
    this.logged = false;
    this.user.name = '';
    this.user.surname = '';
    this.user.id = '';
  }
}
