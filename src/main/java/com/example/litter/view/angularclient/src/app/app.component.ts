import { Component } from '@angular/core';
import {TokenStorageService} from "./services/authentication/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string;
  private roles: string[];
  private authority: string;

  constructor(private tokenStorageService : TokenStorageService) {
    this.title = 'Litter';
    if(this.tokenStorageService.getToken()){
      this.roles = this.tokenStorageService.getAuthorities();
      this.roles.every(role => {
        if (role === 'ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }

  }
}
