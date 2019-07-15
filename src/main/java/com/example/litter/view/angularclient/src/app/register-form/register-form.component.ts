import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {UserLogin} from "../model/user-login";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent{

	user : User;
	error : boolean = false;
	success : boolean = false;
	errorMsg : string = "";
	successMsg : string = "Success! Redirecting...";

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService : AuthenticationService) {
    this.user = new User();
    this.user.role.push("user");
  }

  onSubmit() {
    this.authenticationService.signUp(this.user).subscribe(result =>{
        console.log("Success!");
        this.error = false;
        this.success = true;
      setTimeout(() =>
        {
          this.router.navigate(['/login']);
        },
        3000);
    }, error1 => {
      this.error = true;
      this.errorMsg = error1.error.message;
      console.log(error1);
  })
  }

}
