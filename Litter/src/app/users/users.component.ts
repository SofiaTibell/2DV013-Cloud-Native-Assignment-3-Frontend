import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ResourceService } from '../services/resource.service';

type User = {
  name: string,
  email: string
  img: string
  id: string
};

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<User> = new Array();
  MyProfile = false;
  show = false;
  userId = '';
  subscribing = false;


  constructor(private authService: AuthService, public router: Router, private resourceService: ResourceService) { }

  ngOnInit(): void {

    this.authService.getUsers()
    .subscribe((res: any) => {
      res.forEach((element: {
        id: string; login: string; email: string; avatarUrl: string; }) => {
        this.users.push({
          name: element.login,
          email: element.email,
          img: element.avatarUrl,
          id: element.id
        });
      });
    });
  }

  async onClick(userId: string) {
    const isAuthenticated = this.authService.isLoggedIn
    this.userId = userId;
    if (isAuthenticated) {
      const user = this.authService.getId()
      this.MyProfile = userId === user
      let found = false;
      await this.resourceService.getFollowings(user)
        .subscribe((res: any) => {
          res.forEach((element: { followed: string; }) => {
            if (element.followed === this.userId) {
              found = true;
            }
          });
          this.subscribing = found;
          this.show = true;
        });
    }
    else {
      this.show = true;
    }
  }

  onClose() {
    this.show = false;
  }

}
