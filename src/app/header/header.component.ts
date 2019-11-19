import { Component, OnInit, OnDestroy } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

import {TranslateService} from '@ngx-translate/core';

import { Subscription } from 'rxjs';

import { MessageService } from '../_services/index';

//import { AppComponent } from '../app.component';

export interface OPTIONS_MENU {
  id: number;
  label: string;
  route: string;
  public: boolean;
}

//{id: 5, label: 'MENU.LOGIN', route: '/login', public: true},
//{id: 6, label: 'MENU.LOGOUT', route: '/logout', public: false}
const ELEMENT_DATA: OPTIONS_MENU[] =[
  {id: 1, label: 'MENU.HOME', route: '', public: true},
  {id: 2, label: 'MENU.JOBS', route: '/jobs', public: false},
  {id: 3, label: 'MENU.CVS', route: '/cvs', public: false},
  {id: 4, label: 'MENU.PROFILES', route: '/profiles', public: false}
];


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  

  route: string;
  userdata: {};
  messages: any[] = [];
  subscription: Subscription;

  menuOptions =ELEMENT_DATA;

  constructor(location: Location, router: Router, public translate: TranslateService, private messageService: MessageService) {
  //  constructor(location: Location, router: Router) {
    
    // subscribe to home component messages
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });


    this.route = location.path();


    translate.addLangs(['en', 'pt', 'el']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt|el/) ? browserLang : 'en');

  }

  deleteItemMessages(index): void {
    // clear messages
    this.messageService.deleteItemMessages(index);
  } 

  ngOnInit() {

    // Read item:
    let userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata) {
      this.userdata = userdata;
    }
    else {
      this.userdata = {'authenticated': false};
    }
    
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

  

  logout() {
    //console.log("log out");
    localStorage.removeItem('userdata');
    this.userdata = {};
    
    //window.location.reload();
    window.location.href="/";
    
  }

}

