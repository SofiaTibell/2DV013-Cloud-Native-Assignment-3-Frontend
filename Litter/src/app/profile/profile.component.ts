import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = "Marie"
  catType = "Burmese"
  friends = 6
  messages = 16
  imgSrc = "assets/img/cat.png"

  constructor() { }

  ngOnInit(): void {
  }

}
