import { Component, OnInit } from '@angular/core';
import { TestifyService } from './testify.service'

declare let SmoothScroll: any;

@Component({
  selector: 'app-home',
  templateUrl: './testify.component.html',
  styleUrls: ['./testify.component.css']
})

export class TestifyComponent implements OnInit {

  loading: boolean=false;
  testifies: any;
  constructor(private productService: TestifyService) { }

  ngOnInit() {
    this.testifies=[];
    SmoothScroll();
    this.getTestify();
  }

  getTestify() {
    this.loading=true;
    this.productService.getTestifies()
      .subscribe(
        (resp) => {
          console.log(resp);
          this.testifies = resp.data;
          this.loading=false;
        },
        (error) => {
          console.log(error);

          return;
        }
      )
  }
}
