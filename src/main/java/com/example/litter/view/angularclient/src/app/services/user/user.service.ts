import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Trash} from "../../model/trash";
import {TrashResponse} from "../../model/trash-response";
import {LikedTrash} from "../../model/liked-trash";
import {Reply} from "../../model/reply";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userTestUrl = "http://localhost:8080/api/test/user";
  private addTrashUrl = "http://localhost:8080/api/trash";
  private allTrashUrl = "http://localhost:8080/api/trash";
  private likeTrashUrl = "http://localhost:8080/api/trash/like/";
  private userIdByUsernameUrl = 'http://localhost:8080/api/user/';
  private likedTrashByUserId = 'http://localhost:8080/api/trash/liked/';
  private trashByIdUrl = 'http://localhost:8080/api/trash/';
  private addReplyUrl = 'http://localhost:8080/api/trash/reply';
  private getChildrenUrl = 'http://localhost:8080/api/trash/';
  private getAllNonRepliesUrl = 'http://localhost:8080/api/trash/nonreplies';

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

  likeTrash(trashId : string, userId : string) : Observable<TrashResponse>{
    return this.http.put<TrashResponse>(this.likeTrashUrl + trashId + "/" + userId, {responseType : "json"});
  }

  getLikedTrashByUserId(userId : string) : Observable<LikedTrash[]>{
    return this.http.get<LikedTrash[]>(this.likedTrashByUserId + userId, {responseType : "json"});
  }

  getUserIdByUsername(username : string): Observable<string>{
    return this.http.get<string>(this.userIdByUsernameUrl + username);
  }

  getTrashById(trashId: any) {
    return this.http.get<Trash>(this.trashByIdUrl + trashId, {responseType : "json"});
  }

  getRepliedTrashByParentId(trashId : any) {
    return this.http.get<Reply>(this.trashByIdUrl + trashId + "/replies",{responseType : "json"});
  }

  addNewTrashReply(trash: Trash) {
    return this.http.post<Trash>(this.addReplyUrl, trash, httpOptions);
  }

  getChildren(id : any){
    return this.http.get(this.getChildrenUrl + id + "/replies");
  }

  getAllNonReplies(){
    return this.http.get<Trash[]>(this.getAllNonRepliesUrl, {responseType : "json"});
  }
}

