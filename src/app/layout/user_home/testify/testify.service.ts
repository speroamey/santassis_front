import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Router,  } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {map} from 'rxjs/operators';
import { PrincipalService } from '../../../shared/services/principal.service';
import { HOST, createRequestOption } from '../../../request-util';

@Injectable()
export class TestifyService {

  private TestifyUrl: string = HOST+'testifies';

  constructor(private router: Router,private http: Http,principal: PrincipalService) {
    // this.carmesUrl = this.loginUrl + '/carte_puce/appCarte.php';
  }

  getTestifies() {
    const options: BaseRequestOptions =  createRequestOption();
    // options.headers.append('Content-Type','application/json')
    return this.http
    .get(this.TestifyUrl, options).pipe(map((res)=>{
     
      return res.json();
    }));     
  }



  addTestifies(data) {
    const options: BaseRequestOptions = createRequestOption();
    // options.headers.append('Content-Type','application/json')
    return this.http
      .post(this.TestifyUrl, data, options).pipe(map((res) => {
        return res.json();
      }));
  }


  updateTestifyAuthorization(data) {
    console.log(data);
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json')
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );
    
    return this.http
      .put(`${this.TestifyUrl}/${data.id}`, data, options).pipe(map((res) => {
        return res.json();
      }));
  }

}
