import { Component, OnInit } from '@angular/core';
import { TestifyService } from './testify.service'

declare let jQuery: any;
declare let SmoothScroll: any;

@Component({
  selector: 'app-home',
  templateUrl: './testify.component.html',
  styleUrls: ['./testify.component.css']
})

export class TestifyComponent implements OnInit {
  loading: boolean = false;
  testifies: any;
  model: any = {};
  isSaving: boolean;
  testify: any;

  constructor(private testifiesService: TestifyService) {
    this.isSaving = false;
    this.testifies = [];
    this.testify ={};
  }

  ngOnInit() {
    this.testifies = [];
    SmoothScroll();
    this.getTestify();
  }

  getTestify() {
    this.loading = true;
    this.testifiesService.getTestifies()
      .subscribe(
        (resp) => {
          console.log(resp);
          this.testifies = resp.data;
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
          return;
        }
      )
  }

  addTestify() {
    console.log(this.model);
    this.isSaving = true;
    if(this.model.id){
      this.authorize(this.model.authorized,this.model);
      jQuery("#addTestify").modal("hide");
    }else{
      this.testifiesService.addTestifies(this.model)
      .subscribe(
        (resp) => {
          this.testifies.push(resp.data);
          console.log(resp.data);
          jQuery("#addTestify").modal("hide");
          this.isSaving = false;
        },
        (error) => {
          this.isSaving = false;
          console.log(error);
        }
      )
    }
    
  }

  authorize(val, obj) {
    obj.authorized = val
    // console.log(val);
    // this.model = obj;
    this.testifiesService.updateTestifyAuthorization(obj)
      .subscribe(
        (resp) => {
          let obj = resp.data;
          this.model = obj;
        },
        (error) => {
          console.log(error);
          return;
        })
  }

  updateTestifyModal(item){
    console.log(item);
    
    this.model=item;
    jQuery("#addTestify").modal("show");
  }
}
