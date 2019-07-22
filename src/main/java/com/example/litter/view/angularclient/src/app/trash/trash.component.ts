import { Component, OnInit } from '@angular/core';
import {Trash} from "../model/trash";
import {UserService} from "../services/user/user.service";
import {TokenStorageService} from "../services/authentication/token-storage.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {MDBModalRef, MDBModalService} from "angular-bootstrap-md";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  modalRef: MDBModalRef;
  trashBag : Trash[] = [];
  isDataLoaded : boolean = false;
  constructor(private userService : UserService, private tokenStorageService : TokenStorageService, private router : Router,
              private modalService: MDBModalService) {
  }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      if(!this.tokenStorageService.getUserId()) {
        this.userService.getUserIdByUsername(this.tokenStorageService.getUsername()).subscribe(result => {
          this.tokenStorageService.saveUserId(result);
          this.fetchTrashList(result);
          this.isDataLoaded = true;
        });
      }else{
        this.fetchTrashList(this.tokenStorageService.getUserId());
        this.isDataLoaded = true;
      }
    }
  }

  likeTrash(event, trashId : string) {
    event.stopPropagation();
    this.userService.likeTrash(trashId,this.tokenStorageService.getUserId()).subscribe(trashResponse =>{
      for(let trash of this.trashBag){
        if(trash.id == trashResponse.trash.id){
          trash.likes = trashResponse.trash.likes; //Update the likes
          trash.liked = trashResponse.liked;
          break;
        }
      }
    })
  }

  fetchTrashList(userId : string){
    this.userService.getAllNonReplies().subscribe(trash =>{
      this.trashBag = trash.reverse();
      for(let trashBagItem of this.trashBag){
        let date = trashBagItem.creation_date;
        date = new Date(date);
        let newDate = new DatePipe('en-Us').transform(date,'M/d/yy, h:mm a', 'GMT-4');
        trashBagItem.creation_date = newDate;
      }
      this.userService.getLikedTrashByUserId(userId).subscribe(trash =>{
        for(let likedTrash of trash){
          for(let currentTrash of this.trashBag){
            if(likedTrash.trash.id == currentTrash.id){
              currentTrash.liked = true;
              break;
            }
          }
        }
      })
    })
  }
  goToTrashPage(id: string) {
    this.router.navigate(['/trash/' + id]);
  }

  goToUserPage(event: MouseEvent) {
    event.stopPropagation();
    //TODO
  }

  openModal(){
    this.modalRef = this.modalService.show(ModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-side modal-top-right',
      containerClass: 'right',
      animated: true
    });
  }
}
