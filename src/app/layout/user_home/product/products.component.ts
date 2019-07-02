import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserProductsService } from './products.service'
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {IMAGE_HOST, createRequestOption } from '../../../request-util';

declare let SmoothScroll: any;
declare let jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class UserProductsComponent implements OnInit {

  private image_url: string = IMAGE_HOST;
  loading: boolean=false;
  products: any;
  formData: FormData;
  model:any={};
  pager_infos: any;
  product: any={};
  shoppingBasket:any=[];
  // @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  constructor(private route: ActivatedRoute, private router:Router,private productService: UserProductsService) { 
    this.products=[];
    this.shoppingBasket=[];
    this.product={};
    this.pager_infos = [];
  }


  ngOnInit() {
    SmoothScroll();
    this.productsList(1);
  }
  pageChanged(event){
    console.log(event);
    // event.preventDefault();
    this.pager_infos.current_page=event;
    this.productsList(event);
    // this.router.navigate([''], {queryParams: {page:event} })
  }
  productsList(page:number) {
    this.loading=true;
    this.productService.getProducts(page)
      .subscribe(
        (resp) => {
         
          this.pager_infos = resp.meta;
          this.products = resp.data;
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

  getProduct(item) {
    console.log(item);
    this.productService.getProduct(item.id)
      .subscribe(
        (resp) => {
          this.product = resp.data;
        },
        (error) => {
          console.log(error);
          return;
        }
      )
  }

  public addProduct(){
    this.productService.addProduct(this.model)
    .subscribe(
      (resp)=>{
       
        resp.data.image_url= this.image_url+resp.data.image;
        this.products.push(resp.data);
        console.log(resp.data);
        jQuery("#addProduct").modal("hide");
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

  addToBasket(item){
    console.log(item);
    
    this.shoppingBasket.push(item);
  }

  showProforma(){

  }

 
  byProduct(){
    console.log('bying');
  }
}
