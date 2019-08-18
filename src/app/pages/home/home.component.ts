import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MostradorService } from 'src/app/services/mostrador.service';
import { WebSocketService } from '../../services/web-socket.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private mostradorService: MostradorService,
    public webSocketService: WebSocketService,
    private chatService: ChatService
  ) {}

  irServicios() {
    this.mostradorService.post().then(resp => {
      console.log(resp);
      this.router.navigateByUrl(`/venta-mostrador/${resp['data']['_id']}`);
    });
  }

  irOrden() {
    this.router.navigateByUrl('/orden');
  }

  irContabilidad() {
    this.router.navigateByUrl('/contabilidad');
  }
}
