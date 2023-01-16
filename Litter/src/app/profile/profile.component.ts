import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ResourceService } from '../services/resource.service';

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
export class ProfileComponent implements OnInit, OnChanges {
  @Input() userId = '';
  @Input() MyProfile = false;
  @Input() subscribing = false;
  userMessages: Array<userMessage> = new Array();
  username = ''
  email = ''
  imgSrc = ''

  constructor(public router: Router, public authService: AuthService, private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.loadPage()
  }

  loadPage() {
    this.authService.getUser(this.userId)
    .subscribe((res: any) => {
      this.username = res.login,
      this.email = res.email,
      this.imgSrc = res.avatarUrl,
      this.userId = res.id
    });
    this.resourceService.getLits(this.userId)
    .subscribe((res: any) => {
      this.userMessages = new Array();
      res.forEach((element: { message: string; createdAt: string;}) => {
        const words = element.createdAt.split('T');
        const date = words[0];
        const time = words[1].slice(0, 8);
        this.userMessages.push({
          message: element.message,
          date: date,
          time: time
        });
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPage()
  }

  onClick(): void {
    this.router.navigate(['./', 'sandbox']);
  }

  onUnsubscribeClick(): void {
    this.resourceService.unfollow(this.userId)
    .subscribe((res: any) => {
      this.subscribing = false;
    });
  }

  onSubscribeClick(): void {
    this.resourceService.follow(this.userId)
    .subscribe((res: any) => {
      this.subscribing = true;
    });
  }
}
