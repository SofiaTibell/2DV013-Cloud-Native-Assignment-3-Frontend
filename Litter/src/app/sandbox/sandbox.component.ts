import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { ResourceService } from '../services/resource.service'

type Messages = {
  text: string,
  authorId: string,
  createdAt: string
};

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {
  userId = ''
  users = new Map();
  messages: Array<Messages> = new Array();
  textareaValue = '';
  constructor(private alertService: AlertService, public resourceService: ResourceService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getId()
    this.authService.getUsers()
    .subscribe((res: any) => {
      res.forEach((element: { id: string; login: string;}) => {
          this.users.set(element.id, element.login)
      });
    });

    this.uppdateChat()
  }

  uppdateChat() {
    this.messages = new Array();
    this.resourceService.getSubscribeLits()
    .subscribe((res: any) => {
      res.forEach((element: {
        createdAt: string; message: string; creatorId: string; }) => {
          const time = element.createdAt.substring(0, element.createdAt.indexOf('.'));
          const timeAndDateSeperated = time.replace("T", " ");
        this.messages.push({
          text: element.message,
          authorId: this.users.get(element.creatorId),
          createdAt: timeAndDateSeperated
        });
      });
    });
  }

  sendMessage() {
    if (this.textareaValue.trim() !== "") {
      if (this.textareaValue.length > 42) {
        this.alertService.add('Too long message', 'alert');
        this.uppdateChat()
        this.textareaValue = '';
      } else {
        this.resourceService.send(this.textareaValue)
        .subscribe((res: any) => {
          this.uppdateChat()
          this.textareaValue = '';
        });
      }
    }
  }

}
