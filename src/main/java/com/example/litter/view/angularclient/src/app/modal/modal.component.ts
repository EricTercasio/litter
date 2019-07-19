import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "angular-bootstrap-md";
import {UserService} from "../services/user/user.service";
import {TokenStorageService} from "../services/authentication/token-storage.service";
import {Trash} from "../model/trash";
import {flatMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent{
  parentId : string;

  constructor(public modalRef: MDBModalRef, private userService : UserService, private tokenStorageService : TokenStorageService) {

  }

  submitReply(trashMessage : any) {
    let trash = new Trash();
    trash.message = trashMessage;
    trash.username = this.tokenStorageService.getUsername();
    this.userService.getTrashById(this.parentId).pipe(
      tap(result => {
        trash.parent = result;
      }),
      flatMap(reply => this.userService.addNewTrashReply(trash)))
      .subscribe(reply =>{
      });
  }
}
