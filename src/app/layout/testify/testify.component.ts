import { Component, OnInit } from '@angular/core';
import { TestifyService } from './testify.service'

declare let SmoothScroll: any;
@Component({
  selector: 'app-testify',
  templateUrl: './testify.component.html',
  styleUrls: ['./testify.component.css']
})
export class TestifyComponent implements OnInit {

  loading: boolean=false;
  testifies: any;
  testify: {};
  constructor(private testifyService: TestifyService) { 
    this.testifies= [];
    this.testify ={};
  }

  ngOnInit() {
    SmoothScroll();
    this.loadTestifies();
  }

  loadTestifies() {
    this.loading=true;
    this.testifyService.getTestifys()
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
