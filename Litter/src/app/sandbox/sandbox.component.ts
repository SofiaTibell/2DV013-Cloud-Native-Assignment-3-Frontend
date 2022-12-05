import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../services/resource.service'

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {
  messages = [
    { text: "Our first message", authorId: 'Burmese' }
  ];
  textareaValue = '';
  constructor(public resourceService: ResourceService) {
  }

  ngOnInit(): void {
    this.resourceService.getMessages()
    .subscribe((res: any) => {
      res.forEach((element: { text: string; authorId: string; }) => {
        this.messages.push({
          text: element.text,
          authorId: element.authorId
        });
      });
    });
  }

  sendMessage() {
    if (this.textareaValue.trim() !== "") {
      this.resourceService.emit({ text: this.textareaValue });
      this.textareaValue = '';
    }
  }

}
