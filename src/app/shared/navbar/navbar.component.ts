import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarColor: string;

  constructor(private router: Router, private navbarService: NavbarService) {
    // navbarService.getNavbarColor().subscribe((data: string) => {
    //     this.navbarColor = data;
    // });
  }

  ngOnInit() {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
