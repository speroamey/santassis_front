import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { HOST, createRequestOption } from '../../../request-util';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { NewsService } from './news.service'
declare let jQuery: any;
declare let SmoothScroll: any;
@Component({
  selector: 'app-home',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  loading: boolean = false;
  public Editor = ClassicEditor;
  public model = {
    content: '<p>Hello, world!</p>',
    title:'le titre'
  };
  
  public config = {ckfinder: {
      uploadUrl:'http://127.0.0.1:8000/api/upload_image',
      options: {
          resourceType: 'Images'
      },
      openerMethod: 'popup'
  }}
  news: any;
  constructor(private newsService: NewsService) {
    // this.Editor = ClassicEditor;
    this.news = [];
    
  }

  
  // ngAfterViewChecked(){
  //   this.Editor
  //   .create( document.querySelector( '#editorData' ), {
  //       // toolbar: ['ckfinder','imageUpload','|','heading', '|', 'fontSize', 'fontFamily', '|', 'bold', 'italic', 'underline', 'strikethrough', 'link', '|', 'alignment:left', 'alignment:center', 'alignment:right', '|', 'numberedList', 'bulletedList', '|', 'ckfinder', 'insertTable', '|', 'undo', 'redo'],
  //       ckfinder: {
  //           uploadUrl:'http://127.0.0.1:8000/api/upload_image',
  //           options: {
  //               resourceType: 'Images'
  //           },
  //           openerMethod: 'popup'
  //       }
  //   })
  //   .then( (elm)=>{
  //     console.log(elm);
  //   } )
  //   .catch(  (error)=>{
  //     console.log(error);
  //   });
  // }
  // ngAfterViewInit(){
    
  // }

  ngOnInit() {
    SmoothScroll();
    this.getNews();
  }


  addNews() {
    console.log(this.model);
    this.newsService.addNews(this.model)
    .subscribe(
      (resp)=>{     
        this.news.push(resp.data);
        console.log(resp.data);
        jQuery("#addNews").modal("hide");
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  getNews() {
    this.loading = true;
    this.newsService.getNews()
      .subscribe(
        (resp) => {
          console.log(resp);
          this.news = resp.data;
          this.loading = false;
        },
        (error) => {
          // console.log(error);
          this.loading = false;
          return;
        }
      )
  }

  uploadImage() {
    this.newsService.uploadImage()
      .subscribe(
        (resp) => {
          console.log(resp);
         
        },
        (error) => {
          console.error(error)
          return;
        }
      )
  }
}
