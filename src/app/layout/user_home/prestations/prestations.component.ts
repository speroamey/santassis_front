import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserPrestationsService } from './prestations.service'
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {IMAGE_HOST, createRequestOption } from '../../../request-util';

declare let SmoothScroll: any;
declare let jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './prestations.component.html',
  styleUrls: ['./prestations.component.css']
})
export class UserPrestationsComponent implements OnInit {

  private image_url: string = IMAGE_HOST;
  loading: boolean=false;
  prestations: any;
  formData: FormData;
  model:any={};
  pager_infos: any;
  // @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  constructor(private route: ActivatedRoute, private router:Router,private prestationService: UserPrestationsService) { 
    this.prestations=[];
    this.pager_infos = [];

    // this.route.queryParamMap
    //     .pipe(map(params => params.get('page')))
    //     .subscribe(page => this.pager_infos.current_page=page);
  }


  ngOnInit() {
    SmoothScroll();
    this.prestationsList(1);
  }
  pageChanged(event){
    console.log(event);
    // event.preventDefault();
    this.pager_infos.current_page=event;
    this.prestationsList(event);
    // this.router.navigate([''], {queryParams: {page:event} })
  }
  prestationsList(page:number) {
    this.loading=true;
    this.prestationService.getPrestations(page)
      .subscribe(
        (resp) => {
         
          this.pager_infos = resp.meta;
          this.prestations = resp.data;
          this.pager_infos.current_page=page;
          this.loading=false;
        },
        (error) => {
          console.log(error);
          this.loading=false;
          return;
        }
      )
  }

  public addprestation(){
    this.prestationService.addPrestation(this.model)
    .subscribe(
      (resp)=>{
       
        resp.data.image_url= this.image_url+resp.data.image;
        this.prestations.push(resp.data);
        console.log(resp.data);
        jQuery("#addprestation").modal("hide");
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  fileUpload(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.image =  reader.result
      };
    }
  }
}
