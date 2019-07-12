import { Component, OnInit } from '@angular/core';
import {Trash} from "../model/trash";

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  trash : Trash;
  trashBag : Trash[] = [];
  trash2 : Trash = new Trash();
  constructor() {
    this.trash = new Trash();
    this.trash.username = "Eric";
    this.trash.likes = "50";
    this.trash.message = "This is a test message. What will it look like when its fairly long?" +
      "Heres some more text to go along with it.";
    this.trashBag.push(this.trash);
    this.trashBag.push(this.trash2);
  }

  ngOnInit() {
  }

}
