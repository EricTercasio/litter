import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "angular-bootstrap-md";
import {UserService} from "../services/user/user.service";
import {Reply} from "../model/reply";
import {TokenStorageService} from "../services/authentication/token-storage.service";

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
    let reply = new Reply();
    reply.message = trashMessage;
    reply.username = this.tokenStorageService.getUsername();
    reply.parentId = this.parentId;
    console.log(reply.parentId);
    this.userService.addNewReply(reply).subscribe(result => {
      console.log(result);
    });
  }
}
