import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  userId = ''
  MyProfile = true;
  subscribing = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userId = this.authService.getId()
  }

}
