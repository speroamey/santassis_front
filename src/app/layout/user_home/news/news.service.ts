import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Router, } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { PrincipalService } from '../../../shared/services/principal.service';
import { HOST, createRequestOption } from '../../../request-util';

@Injectable()
export class NewsService {

  private newsUrl: string = HOST + 'news';
  private uploadUrl: string = HOST + 'upload_image';

  constructor(private router: Router, private http: Http, principal: PrincipalService) {
    // this.carmesUrl = this.loginUrl + '/carte_puce/appCarte.php';
  }

  getNews() {
    const options: BaseRequestOptions = createRequestOption();
    // options.headers.append('Content-Type','application/json')
    return this.http
      .get(this.newsUrl, options).pipe(map((res) => {
        return res.json();
      }));
  }

  updateNew(data){
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json')
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );

    return this.http
      .put(`${this.newsUrl}/${data.id}`, data, options).pipe(map((res) => {
        return res.json();
      }));
  }

  getNew(id) {
    const options: BaseRequestOptions = createRequestOption();
    // options.headers.append('Content-Type','application/json')
    return this.http
      .get(`${this.newsUrl}/${id}`, options).pipe(map((res) => {
        return res.json();
      }));
  }

  addNews(data) {
    const options: BaseRequestOptions = createRequestOption();
    // options.headers.append('Content-Type','application/json')
    return this.http
      .post(this.newsUrl, data, options).pipe(map((res) => {
        return res.json();
      }));
  }

  uploadImage() {
    const options: BaseRequestOptions = createRequestOption();
    return this.http
      .post(this.uploadUrl, options).pipe(map((res) => {
        console.log(res);
        return res.json();
      }));
  }

}
