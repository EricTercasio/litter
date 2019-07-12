import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication/authentication.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent{

	user : User;
	error : boolean = false;
	errorMsg : string = "";

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService : AuthenticationService) {
    this.user = new User();
    this.user.role.push("user");
  }

  onSubmit() {
    this.authenticationService.signUp(this.user).subscribe(result =>{
        console.log("Success!")
    }, error1 => {
      this.error = true;
      this.errorMsg = error1.error.message;
      console.log(error1);
  })
  }

}
