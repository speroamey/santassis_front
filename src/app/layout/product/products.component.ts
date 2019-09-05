import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserProductsService } from './products.service'
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IMAGE_HOST, createRequestOption } from '../../request-util';
import { PrincipalService } from "../../shared/services/principal.service";

declare let SmoothScroll: any;
declare let jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private image_url: string = IMAGE_HOST;
  loading: boolean = false;
  products: any;
  formData: FormData;
  model: any = {};
  pager_infos: any;
  product: any = {};
  shoppingBasket: any;
  types: any = [];
  zones: any = [];

  productSelected: any;
  editField: string;
  quantity_commanded: number;
  original_product: any;
  isConnected: boolean;
  panier:  any ={};
  command_data: any = {};
  ht_price: number;
  livraison_price: any;
  // @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router, private productService: UserProductsService, private principalService: PrincipalService) {
    this.isConnected = false;
    this.products = [];
    this.shoppingBasket = [];
    this.product = {};
    this.command_data= {};
    this.productSelected = {};
    this.original_product = {};
    this.types = ['Comprimés', 'Géllules', 'Sirop', 'Autres'];
    this.zones = [{name:'Cotonou','price':'1000'},{name:'Calavi/Pahou','price':'1500'},{name:'Ouidah/Porto-Novo','price':'2000'}]
    this.panier={};
    this.panier.zone={'price':0};
    this.pager_infos = [];
  }


  ngOnInit() {
    this.isConnected = false;
    SmoothScroll();
    this.connectedUser();
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

  productOrdonnanceModal(product) {
    this.model = product;
    console.log(this.model);
    jQuery("#productOrdonnance").modal("show");
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
          if (this.isConnected) {
            let prod = resp.data;
            this.original_product = Object.assign({}, prod);
            jQuery("#detailsProduct").modal("show");
          } else {
            jQuery("#notConnected").modal("show");
          }

        },
        (error) => {
          console.log(error);
          return;
        }
      )
  }

  public addProduct() {
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

  showProforma() {

  }
  //One command has many line commands
  //line_commands belongs to one commande so we have to save
  //a commande (id=returned by database, ref="generated in backend", 
  //client_id='connected_user')
  //after that we can loop on array to save each line_command

  byProduct() {
    this.loading = true;
    let data = this.shoppingBasket;
    let livraison = this.panier;
    console.log(this.panier);
    
    this.productService.saveCommand(data)
      .subscribe(
        (resp) => {
          this.product = resp.data;
          this.productsList(1);
         
          
          jQuery("#bascketDetails").modal("hide");
          //update command adding total ttc_price, commssion and livraison
          
          this.command_data = {};
          this.command_data.id = resp.data.id;
          this.command_data.total = this.ht_price;
          this.command_data.ttc_price = parseInt(livraison.zone.price) + this.ht_price;
          this.command_data.comissions = (this.ht_price*10)/100;
          this.command_data.address_livraison = this.ht_price;
          this.command_data.zone_livraison = livraison.zone.name;
          this.command_data.livraison_price = parseInt(livraison.zone.price);
          console.log(this.command_data);
          
          this.productService.updateCommand(this.command_data)
          .subscribe((resp) => {
            // console.log(resp);
            this.shoppingBasket.length = 0;
            // this.panier={};
            this.loading = false;

          }, (error) => {
            console.log(error);
            this.loading = false;

          });
        },
        (error) => {
          console.log(error);
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


  connectedUser() {
    this.principalService.connectedUser()
      .subscribe((resp) => {
        console.log(resp);
        this.isConnected = true;
        this.model = {};
      }, (error) => {
        console.log(error);
        this.isConnected = false;
      });
  }

  
  get total(){
    return this.shoppingBasket.reduce((a, b)=>{
      this.ht_price = a + b.tva_price;
      return a + b.tva_price;
    }, 0);
  }


  

  get ttcPrice(){    
    return this.total + parseInt(this.panier.zone.price)
  }
}
