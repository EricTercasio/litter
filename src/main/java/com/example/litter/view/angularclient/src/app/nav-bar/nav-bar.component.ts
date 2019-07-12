import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../services/authentication/token-storage.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn : boolean = false;

  constructor(private tokenStorageService : TokenStorageService) { }

  ngOnInit() {
    if(this.tokenStorageService.getToken()){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }

  }

  logout(){
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
