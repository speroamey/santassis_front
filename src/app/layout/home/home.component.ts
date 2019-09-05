import { Component, OnInit } from '@angular/core';
import { AboutUsService } from '../about-us/about-us.service'
import { NewsService } from '../news/news.service'


declare let SmoothScroll: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contact: any
  loading: boolean;
  news: any;
  constructor(private aboutUsService: AboutUsService, private lastNewsService: NewsService) {
    this.contact = {};
    this.news= [];
    this.loading = false;
  }

  ngOnInit() {
    SmoothScroll();
    this.lastNews()
  }

  sendMessage() {
    this.loading = true;
    this.aboutUsService.sendMessage(this.contact)
      .subscribe(
        (resp) => {
          console.log(resp);
          // this.contact = resp.data;
          this.loading = false;
        },
        (error) => {
          // console.log(error);
          return;
        }
      )

  }


  lastNews() {
    this.loading = true;
    this.lastNewsService.getLastNews()
      .subscribe(
        (resp) => {
          console.log(resp);
          this.news=resp.data;
          // this.contact = resp.data;
          this.loading = false;
        },
        (error) => {
          // console.log(error);
          return;
        }
      )

  }
}
