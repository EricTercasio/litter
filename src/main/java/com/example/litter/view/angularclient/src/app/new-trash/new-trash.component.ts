import { Component, OnInit } from '@angular/core';
import {Trash} from "../model/trash";
import {TokenStorageService} from "../services/authentication/token-storage.service";
import {UserService} from "../services/user/user.service";
import {TrashComponent} from "../trash/trash.component";

@Component({
  selector: 'app-new-trash',
  templateUrl: './new-trash.component.html',
  styleUrls: ['./new-trash.component.scss']
})
export class NewTrashComponent implements OnInit {

  trash : Trash;
  defaultValue : string = "";
  charLimitMessage : string = "Character limit of 255.";
  constructor(private tokenStorageService : TokenStorageService, private userService : UserService
  , private trashComponent : TrashComponent) { }

  ngOnInit() {
  }

  newTrash(trashMessage : string) {
    this.trash = new Trash();
    this.trash.message = trashMessage;
    this.trash.username = this.tokenStorageService.getUsername().toLowerCase();
    this.userService.addNewTrash(this.trash).subscribe(data =>{
      this.trashComponent.ngOnInit();
      this.defaultValue = "";
      console.log("Success!");
    },error1 => {
      console.log(error1);
    });
  }
}
