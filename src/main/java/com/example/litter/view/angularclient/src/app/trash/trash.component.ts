import { Component, OnInit } from '@angular/core';
import {Trash} from "../model/trash";
import {UserService} from "../services/user/user.service";
import {TokenStorageService} from "../services/authentication/token-storage.service";
import {flatMap, tap} from "rxjs/operators";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  trashBag : Trash[] = [];
  creationDate : string = "01/05/2019 5:00PM";
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
      for(let trashBagItem of this.trashBag){
        let date = trashBagItem.creation_date;
        date = new Date(date);
        let newDate = new DatePipe('en-Us').transform(date,'M/d/yy, h:mm a', 'GMT-8');
        trashBagItem.creation_date = newDate;
      }
      console.log(this.trashBag);
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

  private militaryToStandardTime(timePortion: any) {
    let time = timePortion.split(':');
    let hours = Number(time[0]);
    let mins = Number(time[1]);
    let seconds = Number(time[2]);

    let calculatedValue;

    if(hours > 0 && hours <= 12){
      calculatedValue = "" + hours;
    }else if(hours > 12){
      calculatedValue = "" + (hours - 12);
    }else{
      calculatedValue = "12";
    }
    calculatedValue += (mins < 10) ? ":0" + mins : ":" + mins;
    calculatedValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;
    calculatedValue += (hours >= 12) ? " P.M." : " A.M.";

    return calculatedValue;


  }

  goToTrashPage(id: string) {
    
  }

  goToUserPage(event: MouseEvent) {
    event.stopPropagation();
    //TODO
  }
}
