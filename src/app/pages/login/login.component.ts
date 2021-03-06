import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../../models/login.model';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = new LoginModel();

  constructor(
    private loginService: LoginService,
    private router: Router,
    public webSocketService: WebSocketService
  ) {
    if (
      localStorage.getItem('token') != null ||
      localStorage.getItem('token') === ''
    ) {
      loginService.isAuthenticate = true;
      router.navigateByUrl('/home');
    }
  }

  ngOnInit() {}

  guardar(form: NgForm) {
    this.loginService.login(this.login).then(data => {
      if (data) {
        // localStorage.setItem('userId', data['data']['_id']);
        this.webSocketService.loginWS(data['data']['nombre']);
        localStorage.setItem('token', data['token']);
        this.loginService.isAuthenticate = true;
        Swal.fire('Bienvenido', data['data']['nombre'], 'success').then(ok => {
          this.router.navigateByUrl('/home');
        });
      }
    });
  }
}
