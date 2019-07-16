import { Component, OnInit } from '@angular/core';
import {Trash} from "../model/trash";
import {UserService} from "../services/user/user.service";
import {TokenStorageService} from "../services/authentication/token-storage.service";
import {flatMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  trashBag : Trash[] = [];
  constructor(private userService : UserService, private tokenStorageService : TokenStorageService) {
  }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      if(!this.tokenStorageService.getUserId()) {
        this.userService.getUserIdByUsername(this.tokenStorageService.getUsername()).subscribe(result => {
          this.tokenStorageService.saveUserId(result);
          this.fetchTrashList(result);
        });
      }else{
        this.fetchTrashList(this.tokenStorageService.getUserId());
      }
      //Get trashed that has been liked by the user

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
    this.userService.getAllTrash().subscribe(trash =>{
      this.trashBag = trash.reverse();
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
    
  }

  goToUserPage(event: MouseEvent) {
    event.stopPropagation();
    //TODO
  }
}
