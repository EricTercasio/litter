import { Component, OnInit } from '@angular/core';
import {Trash} from "../model/trash";
import {UserService} from "../services/user/user.service";
import {TokenStorageService} from "../services/authentication/token-storage.service";

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
      this.userService.getAllTrash().subscribe(data => {
        this.trashBag = data.reverse();
      })
    }
  }

}
