import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { HOST, createRequestOption } from '../../../request-util';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { NewsService } from './news.service'
declare let jQuery: any;
declare let SmoothScroll: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.add.component.html',
  styleUrls: ['./news.component.css']
})
export class AddNewsComponent implements OnInit {

  loading: boolean = false;
  public Editor = ClassicEditor;
  public model = {
    content: '<p> Ajouter votre texte!</p>',
    title:'le titre'
  };
  
  public config = {ckfinder: {
      uploadUrl:'http://127.0.0.1:8000/api/upload_image',
      options: {
          resourceType: 'Images'
      },
      openerMethod: 'popup',
      language:'fr'
  }}
  news: any;
  constructor(private newsService: NewsService) {
    // this.Editor = ClassicEditor;
    this.news = [];
  }



  ngOnInit() {
    SmoothScroll();
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
