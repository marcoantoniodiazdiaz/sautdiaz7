import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(
    private chatService: ChatService,
    public webSocketService: WebSocketService,
    private router: ActivatedRoute,
    private serviciosService: ServiciosService
  ) {}

  messagesSuscription: Subscription;
  privateMessageSuspription: Subscription;
  textMessage = '';

  vehiculo = '';
  idServicio: string;
  cliente = '';

  element: HTMLElement;

  MESSAGES: any[] = [];

  async ngOnInit() {
    await this.router.params.subscribe(params => {
      this.idServicio = params['servicio'];
    });

    this.serviciosService.findById(this.idServicio).subscribe(data => {
      const mensajes = data['data'][0]['chat'];
      console.log(data['data'][0]);

      this.vehiculo = `${data['data'][0]['vehiculo']['marca']['nombre']} ${
        data['data'][0]['vehiculo']['submarca']
      }`;
      this.cliente = data['data'][0]['vehiculo']['cliente']['nombre'];

      mensajes.forEach(msg => {
        this.MESSAGES.push(msg);
      });
    });

    this.element = document.getElementById('box');

    this.messagesSuscription = this.chatService.getMessages().subscribe(msg => {
      this.MESSAGES.push(msg);
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 50);
    });

    this.privateMessageSuspription = this.chatService
      .getMessagesPrivate()
      .subscribe(msg => {
        this.MESSAGES.push(msg);
        setTimeout(() => {
          this.element.scrollTop = this.element.scrollHeight;
        }, 50);
      });
  }

  ngOnDestroy() {
    this.messagesSuscription.unsubscribe();
    this.privateMessageSuspription.unsubscribe();
  }

  send(form: NgForm) {
    if (this.textMessage.trim().length === 0) {
      return;
    }

    this.chatService.sendMessage(this.textMessage, this.idServicio);
    this.textMessage = '';
  }
}
