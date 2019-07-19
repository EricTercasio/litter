import { Component, OnInit } from '@angular/core';
import {Trash} from "../model/trash";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user/user.service";
import {flatMap, map, mergeMap, tap} from 'rxjs/operators';
import {TokenStorageService} from "../services/authentication/token-storage.service";
import {Reply} from "../model/reply";
import {DatePipe} from "@angular/common";
import {MDBModalRef, MDBModalService} from "angular-bootstrap-md";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-individual-trash',
  templateUrl: './individual-trash.component.html',
  styleUrls: ['./individual-trash.component.scss']
})
export class IndividualTrashComponent implements OnInit {

  parentTrash : Trash = new Trash();

  replyTrashBag : any;

  modalRef: MDBModalRef;



  constructor(private route : ActivatedRoute, private router : Router, private userService : UserService,
              private tokenStorageService : TokenStorageService,private modalService: MDBModalService) { }

  ngOnInit() {
    if(this.tokenStorageService.getToken()) {
      let userId = this.tokenStorageService.getUserId();
      let likedTrash;
      //Fetch trash id from page parameters
      this.route.paramMap
        .pipe(
          flatMap(params => this.userService.getTrashById(params.get("trashId"))),
          tap(trashResult => {
            this.parentTrash = trashResult;
            this.fixTime(this.parentTrash);
            let children = this.parentTrash.children;
            this.replyTrashBag = children;
          }),

          flatMap(trashResult => this.userService.getChildren(trashResult.id)),
          tap(repliedTrashResult => {
            console.log(repliedTrashResult);
            console.log(this.parentTrash);
            //this.replyTrashBag = repliedTrashResult;
            //for(let i = 0; i < this.replyTrashBag.length; i++){
            //  this.fixTime(this.replyTrashBag[i]);
            //}
          }),
          flatMap(() => this.userService.getLikedTrashByUserId(userId)),
        ).subscribe(likedResult => {
          likedTrash = likedResult;
          let currentTrash;
          for(let i = 0; i < this.replyTrashBag.length + 1; i++){ // +1 to account for parent trash

            if(i == 0){
              currentTrash = this.parentTrash;
            }else{
              currentTrash = this.replyTrashBag[i - 1];
            }
            //First fix the time
            for(let k = 0; k < likedResult.length; k++){
              if(currentTrash.id == likedResult[k].trash.id){
                currentTrash.liked = true;
              }
            }
          }
      },error1 => {
          console.log(error1);
      });
    }else{
      this.router.navigate(['/login']);
    }
  }

  fixTime(trash : Trash){
    let date = trash.creation_date;
    date = new Date(date);
    let newDate = new DatePipe('en-Us').transform(date,'M/d/yy, h:mm a', 'GMT-8');
    trash.creation_date = newDate;
  }

  likeTrash(event, trashId : string) {
    event.stopPropagation();
    this.userService.likeTrash(trashId,this.tokenStorageService.getUserId()).subscribe(trashResponse =>{
      this.parentTrash.liked = trashResponse.liked;
      this.parentTrash.likes = trashResponse.trash.likes;
    })
  }


  openModal(parentId : any){
    console.log(parentId);
    this.modalRef = this.modalService.show(ModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      containerClass: 'right',
      animated: true,
      data: {
        parentId
      }
    });
  }

}
