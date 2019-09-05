import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserProductsService } from './products.service'
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IMAGE_HOST, createRequestOption } from '../../../request-util';

declare let SmoothScroll: any;
declare let jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class UserProductsComponent implements OnInit {
  private image_url: string = IMAGE_HOST;
  loading: boolean = false;
  products: any;
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
  // @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router, private productService: UserProductsService) {
    this.products = [];
    this.shoppingBasket = [];
    this.product = {};
    this.productSelected = {};
    this.original_product = {};
    this.types = ['Comprimés', 'Géllules', 'Sirop', 'Autres']
    this.pager_infos = [];
  }


  ngOnInit() {
    SmoothScroll();
    this.productsList(1);
  }

  pageChanged(event) {
    console.log(event);
    // event.preventDefault();
    this.pager_infos.current_page = event;
    this.productsList(event);
    // this.router.navigate([''], {queryParams: {page:event} })
  }

  productsList(page: number) {
    this.loading = true;
    this.productService.getProducts(page)
      .subscribe(
        (resp) => {
          console.log(resp);
          this.pager_infos = resp.meta;
          this.products = resp.data;
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

  getProduct(product) {
    console.log(product);
    this.product = product;
    // this.product.name= 'toto';
    console.log(this.product);
    this.productSelected = product;
    this.productService.getProduct(product.id)
      .subscribe(
        (resp) => {
          let prod = resp.data;
          this.original_product = Object.assign({}, prod);
        },
        (error) => {
          console.log(error);
          return;
        }
      )
  }

  public addProduct(elm?) {
    if (this.model.id) {
      this.loading= true;
      // console.log(elm);
      // console.log(this.model);
      this.productService.updateProduct(this.model)
        .subscribe(
          (resp) => {
            resp.data.image_url = this.image_url + resp.data.image;
            this.model = resp.data;
            console.log(resp);
            this.model={};
            this.loading=false;
            jQuery("#addProduct").modal("hide");
          },
          (error) => {
            this.loading=false;
            console.log(error);
          }
        )
    } else {
      this.productService.addProduct(this.model)
        .subscribe(
          (resp) => {
            resp.data.image_url = this.image_url + resp.data.image;
            this.products.push(resp.data);
            jQuery("#addProduct").modal("hide");
          },
          (error) => {
            console.log(error);
          }
        )
    }

  }

  fileUpload(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.image = reader.result
      };
    }
  }

  ordonnanceFileUpload(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        this.model.image_ordonnance = reader.result
      };
    }
  }

  addToBasket(item) {
    console.log(item);
    item.tva_price = item.quantity_commanded * item.price;
    // this.product.show = true;

    if (this.shoppingBasket.length > 0) {

      var found = this.shoppingBasket.find(function (element) {
        return element.id == item.id;
      });
      console.log(found);
      if (!found) {
        this.shoppingBasket.push(item);
      } else {
        console.log(found);
        item.quantity_commanded = found.quantity_commanded;
      }
    } else {
      console.log('empty array');
      this.shoppingBasket.push(item);
    }


    // this.product.previous_quantity = this.product.quantity;
    this.quantity_commanded = this.productSelected.quantity - item.quantity_commanded;
    console.log(this.original_product.quantity);

    this.product.quantity = this.original_product.quantity - item.quantity_commanded;
    console.log(this.product.quantity);
    jQuery("#detailsProduct").modal("hide");
  }


  //One command has many line commands
  //line_commands belongs to one commande so we have to save
  //a commande (id=returned by database, ref="generated in backend", 
  //client_id='connected_user')
  //after that we can loop on array to save each line_command

  byProduct() {
    let data = this.shoppingBasket;
    this.loading = true;
    this.productService.saveCommand(data)
      .subscribe(
        (resp) => {
          this.product = resp.data;
          this.productsList(1);
          this.shoppingBasket.length = 0;
          this.loading = false;
          jQuery("#bascketDetails").modal("hide");
        },
        (error) => {
          console.log(error);
          this.loading = false;
          return;
        }
      )
  }

  updateList(id: number, property: string, event: any, elm) {
    const editField = event.target.textContent;
    this.shoppingBasket[id][property] = editField;
    this.product.quantity = this.original_product.quantity - editField;
    console.log(elm);

    elm.tva_price = editField * elm.price;
    // this.shoppingBasket.forEach((item) => {
    //   if (item.id === id) {
    //     item.tva_price = editField * item.price;
    //   }
    // });
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  revoveFromBascket(elm) {
    this.shoppingBasket.forEach((p, i) => {
      console.log(p.id);
      console.log(elm.id);
      if (p.id === elm.id) {
        this.shoppingBasket.splice(i, 1);
        this.product.quantity = this.original_product.quantity;
      }
    });
  }


  update(product) {
    this.model = product;
    console.log(this.model);
    jQuery("#addProduct").modal("show");
  }

  removeModal(product) {
    this.model = product;
    console.log(this.model);
    jQuery("#removeProduct").modal("show");
  }

  productOrdonnanceModal(product) {
    this.model = product;
    console.log(this.model);
    jQuery("#productOrdonnance").modal("show");
  }


  authorizeProduct(val,obj){
    obj.authorized = val
    console.log(val);
    this.product = obj;
    this.productService.updateProductStatus(obj)
    .subscribe(
      (resp) => {
        let obj = resp.data;
        console.log(obj);
        this.product = obj; 
      },
      (error) => {
        console.log(error);
        return;
      })
  }
  remove() {
    this.productService.removeProduct(this.model)
      .subscribe(
        (resp) => {
          console.log(resp);
          this.products.forEach((p, i) => {
            if (p.id === resp.data.id) {
              this.products.splice(i, 1);
            } else {
              console.log("nothing");
            }
          });
          jQuery("#removeProduct").modal("hide");
        },
        (error) => {
          console.log(error);
        }
      )
  }
}
