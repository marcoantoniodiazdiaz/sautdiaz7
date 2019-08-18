import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/Usuario';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public status = false;
  public usuario: Usuario = null;

  constructor(private socket: Socket) {
    this.loadStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.status = true;
      this.loadStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.status = false;
    });
  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }

  loginWS(nombre: string) {
    // console.log(user, 'ha iniciado sesión en sockets');
    return new Promise((resolve, reject) => {
      this.socket.emit('set_user', { nombre }, resp => {
        this.usuario = new Usuario(nombre);
        this.saveStorage();
        resolve();
      });
    });
  }

  loadStorage() {
    if (localStorage.getItem('userName')) {
      this.usuario = JSON.parse(localStorage.getItem('userName'));
      this.loginWS(this.usuario.nombre);
    }
  }

  saveStorage() {
    localStorage.setItem('userName', JSON.stringify(this.usuario));
  }
}
