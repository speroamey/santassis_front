import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { HOST, createRequestOption } from '../../../request-util';
import { RouterModule, ActivatedRoute } from '@angular/router';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

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
    id:null,
    content: '<p> Ajouter votre texte!</p>',
    title: 'le titre',
    image_cover:''
  };
  // http://127.0.0.1:8000
  public config = {
    ckfinder: {
      uploadUrl: '  https://santassis-afrique.com/api/upload_image',
      options: {
        resourceType: 'Images'
      },
      openerMethod: 'popup',
      language: 'fr'
    }
  }
  news: any;
  current: any;
  constructor(private newsService: NewsService, private route: ActivatedRoute) {
    // this.Editor = ClassicEditor;
    this.news = [];
  }



  ngOnInit() {
    SmoothScroll();
    this.route.params.subscribe((params) => {
      console.log(params);
      if (params['id']) {
        this.current = params['id'];
        this.getData();
      }
    });
  }


  addNews() {
   console.log(this.model);
    if (this.model.id) {
      console.log(true);
      console.log(this.model);
      this.newsService.updateNew(this.model)
        .subscribe(
          (resp) => {
            this.news.push(resp.data);
            console.log(resp.data);
            jQuery("#addNews").modal("hide");
          },
          (error) => {
            console.log(error);
          }
        )
    } else {
      this.newsService.addNews(this.model)
        .subscribe(
          (resp) => {
            this.news.push(resp.data);
            jQuery("#addNews").modal("hide");
          },
          (error) => {
            console.log(error);
          }
        )
    }

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

  fileUpload(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.image_cover = <string> reader.result

      };
    }
  }

  getData() {
    this.newsService.getNew(this.current)
      .subscribe(
        (resp) => {
          // this.news.push(resp.data);
          console.log(resp.data);
          resp.data.content = resp.data.content;
          this.model = resp.data;
          // jQuery("#addNews").modal("hide");
        },
        (error) => {
          console.log(error);
        }
      )
  }
}
