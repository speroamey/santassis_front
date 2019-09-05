import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service'
import {PagerService} from '../../shared/services/pager.service';

declare let SmoothScroll: any;
@Component({
  selector: 'app-home',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  loading: boolean=false;
  products: any[];
  pager: any;
  pagedItems: any[];

  constructor(private productService: ProductsService, private pagerService: PagerService) { }

  ngOnInit() {
    SmoothScroll();
    this.getProducts();
    this.setPage(1);
  }

  getProducts() {
    this.loading=true;
    this.productService.getProducts()
      .subscribe(
        (resp) => {
          console.log(resp);
          this.products = resp.data;
          this.loading=false;
        },
        (error) => {
          console.log(error);
          return;
        }
      )
  }


  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.products.length, page);

    // get current page of items
    this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
