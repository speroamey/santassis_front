import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Router,  } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {map} from 'rxjs/operators';
import { PrincipalService } from '../../shared/services/principal.service';
import { HOST, createRequestOption } from '../../request-util';

@Injectable()
export class NewsService {

  private  newsUrl: string = HOST+'all_news';
  private  newUrl: string = HOST+'news';
  private  lastNewsUrl: string = HOST+'last_news';
  
  constructor(private router: Router,private http: Http,principal: PrincipalService) {
    // this.carmesUrl = this.loginUrl + '/carte_puce/appCarte.php';
  }

  getNews() {
    const options: BaseRequestOptions =  createRequestOption();
    // options.headers.append('Content-Type','application/json')
    return this.http
    .get(this.newsUrl, options).pipe(map((res)=>{
      return res.json();
    }));     
  }


  getNew(id) {
    const options: BaseRequestOptions = createRequestOption();
    // options.headers.append('Content-Type','application/json')
    return this.http
      .get(`${this.newUrl}/${id}`, options).pipe(map((res) => {
        return res.json();
      }));
  }


  getLastNews(){
      const options: BaseRequestOptions =  createRequestOption();
      // options.headers.append('Content-Type','application/json')
      return this.http
      .get(this.lastNewsUrl, options).pipe(map((res)=>{
        return res.json();
      }));     
  }

}
