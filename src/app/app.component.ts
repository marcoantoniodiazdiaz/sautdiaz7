import {
  Component,
  OnInit,
  Inject,
  Renderer,
  ElementRef,
  ViewChild,
  HostListener
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { WebSocketService } from './services/web-socket.service';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //

  constructor(
    public wsSocketService: WebSocketService,
    public chatComponent: ChatService
  ) {}

  ngOnInit() {
    this.chatComponent.getMessagesPrivate().subscribe(msg => {
      console.log(msg);
    });
  }
}
