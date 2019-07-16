import { Component, OnInit } from '@angular/core';
import {UserLogin} from "../model/user-login";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {TokenStorageService} from "../services/authentication/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  userLogin : UserLogin;
  isLoggedIn : boolean = false;
  loginFailed : boolean = false;
  errorMessage : string = "";
  roles : string[] = [];

  constructor(private authenticationService : AuthenticationService,  private tokenStorageService : TokenStorageService,
  private route : ActivatedRoute, private router : Router) {
    this.userLogin = new UserLogin();
  }

  ngOnInit() {
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getAuthorities();
      this.goToHome();
    }
  }
  onSubmit(){
    this.authenticationService.logIn(this.userLogin).subscribe(data =>{
      this.tokenStorageService.saveToken(data.accessToken);
      this.tokenStorageService.saveAuthorities(data.authorities);
      this.tokenStorageService.saveUsername(data.username);

      this.loginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getAuthorities();
      window.location.reload();
    }, error => {
      console.log(error);
      this.loginFailed = true;
      this.errorMessage = "Invalid Credentials";
    })
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
}
