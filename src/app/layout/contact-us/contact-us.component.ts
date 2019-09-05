import { Component, OnInit } from '@angular/core';
import {ContactUsService } from './contact-us.service'

declare let SmoothScroll: any;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contact:any
  loading: boolean;

  constructor(private aboutUsService: ContactUsService) { 
    this.contact={};
    this.loading= false;
  }

  ngOnInit() {
    SmoothScroll();
  }

  sendMessage(){
      this.loading=true;
      this.aboutUsService.sendMessage(this.contact)
        .subscribe(
          (resp) => {
            console.log(resp);
            // this.contact = resp.data;
            this.loading=false;
          },
          (error) => {
            // console.log(error);
            return;
          }
        )
    
  }
}
