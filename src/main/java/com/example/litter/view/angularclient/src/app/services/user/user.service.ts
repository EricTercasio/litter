import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userTestUrl = "http://localhost:8080/api/test/user";

  constructor(private http : HttpClient) { }

  getUserTest() : Observable<string> {
    console.log(this.http.get(this.userTestUrl, {responseType : 'text'}));
    return this.http.get(this.userTestUrl, {responseType : 'text'});
  }
}
