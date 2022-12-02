import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  onLogoutClick(): void {
    this.authService.logout();
  }

  onLoginClick(): void {
    this.authService.login();
  }

  ngOnInit(): void {
  }

}
