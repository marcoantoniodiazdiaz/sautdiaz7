import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../../models/login.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private url = 'http://localhost:3000';
  private url = environment.database;
  isAuthenticate = false;

  constructor(private http: HttpClient) {}

  login(login: LoginModel) {
    return new Promise(pass => {
      return this.http.post(`${this.url}/login`, login).subscribe(
        data => {
          pass(data);
        },
        err => {
          // console.log(err);
        }
      );
    });
  }
}
