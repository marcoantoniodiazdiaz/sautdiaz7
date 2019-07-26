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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //

  constructor() {}

  ngOnInit() {}
}
