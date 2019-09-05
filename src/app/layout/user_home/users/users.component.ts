import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserUsersService } from './users.service'
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IMAGE_HOST, createRequestOption } from '../../../request-util';

declare let SmoothScroll: any;
declare let jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UserUsersComponent implements OnInit {
  private image_url: string = IMAGE_HOST;
  loading: boolean = false;
  users: any;
  formData: FormData;
  model: any = {};
  pager_infos: any;
  product: any = {};
  shoppingBasket: any;
  types: any = [];
  productSelected: any;
  editField: string;
  quantity_commanded: number;
  original_product: any;
  user: any;
  // @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router, private productService: UserUsersService) {
    this.users = [];
    this.shoppingBasket = [];
    this.product = {};
    this.productSelected = {};
    this.original_product = {};
    this.types = ['Comprimés', 'Géllules', 'Sirop', 'Autres']
    this.pager_infos = [];
  }


  ngOnInit() {
    SmoothScroll();
    this.usersList(1);
  }
  pageChanged(event) {
    console.log(event);
    // event.preventDefault();
    this.pager_infos.current_page = event;
    this.usersList(event);
    // this.router.navigate([''], {queryParams: {page:event} })
  }
  usersList(page: number) {
    this.loading = true;
    this.productService.getUsers(page)
      .subscribe(
        (resp) => {
          console.log(resp);
          
          this.pager_infos = resp.meta;
          this.users = resp.data;
          this.pager_infos.current_page = page;
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
          return;
        }
      )
  }

  
 
 
  activeUser(val,obj){
    obj.active = val
    console.log(val);
    this.user = obj;
    this.productService.updateUserStatus(obj)
    .subscribe(
      (resp) => {
        let obj = resp.data;
        this.user = obj;      },
      (error) => {
        console.log(error);
        return;
      })
  }
 

}
