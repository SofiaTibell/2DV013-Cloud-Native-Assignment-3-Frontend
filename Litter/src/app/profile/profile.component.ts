import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

type userMessage = {
  message: string,
  date: string,
  time: string
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userMessages: Array<userMessage> = new Array();
  username = "Marie"
  catType = "Burmese"
  friends = 6
  messages = this.userMessages.length
  imgSrc = "assets/img/cat.png"

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.userMessages.push({
      message: "First message",
      date: "2022.12.11",
      time: "12.01"
    })
    this.userMessages.push({
      message: "Second message",
      date: "2022.12.11",
      time: "13.55"
    })
    this.userMessages.push({
      message: "Third message",
      date: "2022.12.11",
      time: "13.59"
    })
    this.messages = this.userMessages.length
  }

  onClick(): void {
    this.router.navigate(['./', 'sandbox']);
  }
}
