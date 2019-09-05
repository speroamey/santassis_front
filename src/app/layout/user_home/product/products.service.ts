import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Router, } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { PrincipalService } from '../../../shared/services/principal.service';
import { HOST, createRequestOption } from '../../../request-util';

@Injectable()
export class UserProductsService {

  private ProductsUrl: string = HOST + 'user-products';
  private CommandsUrl: string = HOST + 'commands';
  private ProductStateUrl: string = HOST + 'product-update-state';
  req:any={};

  constructor(private router: Router, private http: Http, principal: PrincipalService) {
    // this.carmesUrl = this.loginUrl + '/carte_puce/appCarte.php';
  }

  getProducts(page?) {
    this.req.page=page;
    // this.req.size=10;
    const options: BaseRequestOptions = createRequestOption(this.req);
    // options.headers.append('Content-Type','application/json')
    return this.http
      .get(this.ProductsUrl, options).pipe(map((res) => {
        return res.json();
      }));
  }

  updateProductStatus(data) {
    console.log(data);
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type', 'application/json')
    console.log(data);
    return this.http
      .put(`${this.ProductStateUrl}/${data.id}`, data, options).pipe(map((res) => {
        return res.json();
      }));
  }


  getProduct(id) {
    const options: BaseRequestOptions = createRequestOption(this.req);
    return this.http
      .get(`${this.ProductsUrl}/${id}`, options).pipe(map((res) => {
        return res.json();
      }));
  }

  addProduct(data) {
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json')
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );
    return this.http
      .post(this.ProductsUrl, data, options).pipe(map((res) => {
        return res.json();
      }));
  }

  updateProduct(data) {
    console.log(data);
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json')
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );
    return this.http
      .put(`${this.ProductsUrl}/${data.id}`, data, options).pipe(map((res) => {
        return res.json();
      }));
  }

  removeProduct(data) {
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json')
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );
    return this.http
      .delete(`${this.ProductsUrl}/${data.id}`, options).pipe(map((res) => {
        return res.json();
      }));
  }


  saveCommand(data) {
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json')
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );
    return this.http
      .post(this.CommandsUrl, data, options).pipe(map((res) => {        
        return res.json();
      }));
  }
}
