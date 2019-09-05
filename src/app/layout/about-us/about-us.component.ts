import { Component, OnInit } from '@angular/core';
import {AboutUsService } from './about-us.service'

declare let SmoothScroll: any;
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  contact:any
  loading: boolean;

  constructor(private aboutUsService: AboutUsService) { 
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
