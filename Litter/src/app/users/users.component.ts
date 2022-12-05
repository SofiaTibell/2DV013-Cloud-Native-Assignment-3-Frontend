import { Component, OnInit } from '@angular/core';

type User = {
  name: string,
  email: string
  img: string
};

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<User> = new Array();

  constructor() { }

  ngOnInit(): void {
    this.users.push({
      name: 'Anna Johnsson',
      email: 'anna.johnsson@gmail.com',
      img: 'https://mdbootstrap.com/img/new/avatars/7.jpg'
    })
    this.users.push({
      name: 'Alex Ray',
      email: 'alex.ray@gmail.com',
      img: 'https://mdbootstrap.com/img/new/avatars/8.jpg'
    })
    this.users.push({
      name: 'Kate Hunington',
      email: 'kate.hunington@gmail.com',
      img: 'https://mdbootstrap.com/img/new/avatars/6.jpg'
    })
  }

}
