import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Router,  } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {map} from 'rxjs/operators';
import { PrincipalService } from '../../shared/services/principal.service';
import { HOST, createRequestOption } from '../../request-util';

@Injectable()
export class ProductsService {

  private ProductsUrl: string = HOST+'products';

  constructor(private router: Router,private http: Http,principal: PrincipalService) {
    // this.carmesUrl = this.loginUrl + '/carte_puce/appCarte.php';
  }

  getProducts() {
    const options: BaseRequestOptions =  createRequestOption();
    // options.headers.append('Content-Type','application/json')
    return this.http
    .get(this.ProductsUrl, options).pipe(map((res)=>{
      return res.json();
    }));     
  }

}
