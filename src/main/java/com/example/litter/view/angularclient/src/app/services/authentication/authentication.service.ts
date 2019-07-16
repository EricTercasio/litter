import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../model/user";
import {Observable} from "rxjs";
import {UserLogin} from "../../model/user-login";
import {JwtResponse} from "../../model/jwt-response";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	private signupUrl = 'http://localhost:8080/api/authentication/signup';
	private loginUrl =  'http://localhost:8080/api/authentication/signin';

  constructor(private http: HttpClient) { }

  signUp(user : User): Observable<string> {
    console.log(user);
    console.log(httpOptions);
    return this.http.post<string>(this.signupUrl, user, httpOptions);
  }

  logIn(userInfo : UserLogin): Observable<JwtResponse>{
    console.log(userInfo);
    console.log(httpOptions);
    return this.http.post<JwtResponse>(this.loginUrl, userInfo, httpOptions);
  }




}
