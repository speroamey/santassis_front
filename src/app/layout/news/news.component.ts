import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service'

declare let SmoothScroll: any;
@Component({
  selector: 'app-home',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  loading: boolean=false;
  constructor(private productService: NewsService) { }

  ngOnInit() {
    SmoothScroll();
    this.news();
  }

  news() {
    this.loading=true;
    this.productService.getNews()
      .subscribe(
        (resp) => {
          console.log(resp);
          this.news = resp.data;
          this.loading=false;
        },
        (error) => {
          console.log(error);

          return;
        }
      )
  }
}
