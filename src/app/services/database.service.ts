import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private url = 'http://localhost:3000';
  // private url = 'https://sautdiaz.herokuapp.com';

  constructor(private http: HttpClient) {}

  get(route: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.url}${route}`, { headers });
  }

  post(route: string, data: any) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });

    return new Promise(pass => {
      return this.http.post(`${this.url}${route}`, data, { headers }).subscribe(
        response => {
          pass(response);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  put(route: string, data: any) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });

    return new Promise(pass => {
      return this.http.put(`${this.url}${route}`, data, { headers }).subscribe(
        response => {
          pass(response);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  delete(route: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    return new Promise(pass => {
      return this.http.delete(`${this.url}${route}`, { headers }).subscribe(
        response => {
          pass(response);
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}
