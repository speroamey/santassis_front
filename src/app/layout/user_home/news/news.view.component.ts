import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { NewsService } from './news.service'
import { Route } from '@angular/compiler/src/core';
declare let jQuery: any;
declare let SmoothScroll: any;
@Component({
  selector: 'app-news-view',
  templateUrl: './news.view.component.html',
  styleUrls: ['./news.component.css']
})
export class ViewNewsComponent implements OnInit {

  loading: boolean = false;
  public Editor = ClassicEditor;
  public model = {
    content: '<p> Ajouter votre texte!</p>',
    title:'le titre'
  };
    news: any;
    current: any;
    public config = {ckfinder: {
        uploadUrl:'http://127.0.0.1:8000/api/upload_image',
        options: {
            resourceType: 'Images'
        },
        openerMethod: 'popup'
    }}
    data: any;

    
  constructor(private newsService: NewsService, private route : ActivatedRoute,private _sanitizer: DomSanitizer) {
    // this.Editor = ClassicEditor;
    this.news = [];
    this.data = {}
  }



  ngOnInit() {
    SmoothScroll();
    
    this.route.params.subscribe((params) => {
        this.current = params['id'];
        this.getData();
    });
  }

  getData(){
    this.newsService.getNew(this.current)
    .subscribe(
      (resp)=>{     
        // this.news.push(resp.data);
        console.log(resp.data);
        resp.data.content=this._sanitizer.bypassSecurityTrustHtml(resp.data.content);
        this.data=resp.data;
        // jQuery("#addNews").modal("hide");
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  addNews() {
    // console.log(this.model);
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
