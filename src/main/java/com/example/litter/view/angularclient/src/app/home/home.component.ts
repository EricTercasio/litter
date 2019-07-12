import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../services/authentication/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tokenInfo : any;
  message : string = "hi";

  constructor(private route : ActivatedRoute, private router : Router,private tokenStorageService : TokenStorageService,
  private userService : UserService) { }

  ngOnInit() {
    if(this.tokenStorageService.getToken()) {
      this.tokenInfo = {
        token: this.tokenStorageService.getToken(),
        username: this.tokenStorageService.getUsername(),
        authorities: this.tokenStorageService.getAuthorities()
      };
      this.userService.getUserTest().subscribe(data =>{
        console.log(data);
        this.message = data;
      },error1 => {
        this.message = `${error1.status}: ${JSON.parse(error1.error).message}`;
        console.log(error1);
      });

    }else{
      this.router.navigate(['/login']);
    }
  }

}
