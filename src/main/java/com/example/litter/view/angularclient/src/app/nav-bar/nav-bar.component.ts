import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../services/authentication/token-storage.service";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn : boolean = false;
  username : string = "";

  constructor(private tokenStorageService : TokenStorageService, private userService : UserService) { }

  ngOnInit() {
    if(this.tokenStorageService.getToken()){
      this.loggedIn = true;
      this.username = this.tokenStorageService.getUsername();
    }else{
      this.loggedIn = false;
      this.username = "";
    }

  }

  logout(){
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  search(value: string) {
    this.userService.searchUsers(value).subscribe(result =>{
      console.log(result);
    })
  }
}
