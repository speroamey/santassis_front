import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Router, } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { PrincipalService } from '../../shared/services/principal.service';
import { HOST, createRequestOption } from '../../request-util';

@Injectable()
export class UserProductsService {

  private ProductsUrl: string = HOST + 'products';
  private CommandsUrl: string = HOST + 'commands';
  req:any={};
  constructor(private router: Router, private http: Http, principal: PrincipalService) {
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


  saveCommand(data) {    
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json')
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );
    
    return this.http
      .post(this.CommandsUrl, data, options).pipe(map((res) => {        
        return res.json();
      }));
  }

  updateCommand(data) {
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type', 'application/json')
    console.log(data);
    return this.http
      .put(`${this.CommandsUrl}/${data.id}`, data, options).pipe(map((res) => {
        return res.json();
      }));
  }
}
