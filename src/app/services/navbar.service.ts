import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  navbarSubject = new BehaviorSubject('bg-transparent');

  constructor() {}

  // TODO: Hacer la barra transparente con Observables

  refresh(type: string) {
    this.navbarSubject.next(type);
  }

  getNavbarColor(): Observable<String> {
    return this.navbarSubject.asObservable();
  }


}
