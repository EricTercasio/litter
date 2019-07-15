import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Trash} from "../../model/trash";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userTestUrl = "http://localhost:8080/api/test/user";
  private addTrashUrl = "http://localhost:8080/api/new/trash";
  private allTrashUrl = "http://localhost:8080/api/all/trash";

  constructor(private http : HttpClient) { }

  getUserTest() : Observable<string> {
    return this.http.get(this.userTestUrl, {responseType : 'text'});
  }

  addNewTrash(trash : Trash) : Observable<Trash>{
    return this.http.post<Trash>(this.addTrashUrl,trash,httpOptions);
  }

  getAllTrash() : Observable<Trash[]>{
    return this.http.get<Trash[]>(this.allTrashUrl, {responseType : "json"});
  }
}
