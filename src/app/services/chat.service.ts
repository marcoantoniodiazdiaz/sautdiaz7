import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(public wsService: WebSocketService) {}

  sendMessage(message: string, servicio: string) {
    const payload = {
      from: this.wsService.usuario.nombre,
      body: message,
      date: new Date().toISOString(),
      servicio
    };

    this.wsService.emit('mensaje', payload);
  }

  getMessages() {
    return this.wsService.listen('newMessages');
  }

  getMessagesPrivate() {
    return this.wsService.listen('private-message');
  }
}
