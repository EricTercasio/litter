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

  replyTrashBag : Trash[] = [];

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
            for(let i = 0; i < children.length; i++){
              this.fixTime(children[i]);
            }
            this.replyTrashBag = children;
          }),
          flatMap(() => this.userService.getLikedTrashByUserId(userId)),
        ).subscribe(likedResult => {
          likedTrash = likedResult;
          this.replyTrashBag.push(this.parentTrash);
          for(let likedTrash of likedResult){
            for(let currentTrash of this.replyTrashBag){
              if(likedTrash.trash.id == currentTrash.id){
                currentTrash.liked = true;
                break;
              }
            }
          }
          this.replyTrashBag.pop();
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
    let newDate = new DatePipe('en-Us').transform(date,'M/d/yy, h:mm a', 'GMT-4');
    trash.creation_date = newDate;
  }

  likeTrash(event, trashId : string) {
    event.stopPropagation();
    this.userService.likeTrash(trashId,this.tokenStorageService.getUserId()).subscribe(trashResponse =>{
      for(let i = 0; i < this.replyTrashBag.length + 1; i++){
        if(i == 0){
          if(this.parentTrash.id == trashResponse.trash.id){
            this.parentTrash.liked = trashResponse.liked;
            this.parentTrash.likes = trashResponse.trash.likes;
            break;
          }
        }else{
          let currentTrash = this.replyTrashBag[i - 1];
          if(currentTrash.id == trashResponse.trash.id){
            currentTrash.liked = trashResponse.liked;
            currentTrash.likes = trashResponse.trash.likes;
            break;
          }
        }
      }
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

    this.modalRef.content.action.subscribe(result =>{
      this.fixTime(result);
      this.replyTrashBag.unshift(result);
    });
  }

  goToTrashPage(id: string) {
    this.router.navigate(['/trash/' + id]);
  }

  goToUserPage(event: MouseEvent) {
    event.stopPropagation();
    //TODO
  }
}
