import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {map} from 'rxjs/operators';

@Injectable()
export class PrincipalService {

  token: string = '';
  _HOST: string = 'http://127.0.0.1:8000/api/';

  loginUrl: string = 'http://127.0.0.1:8000/api/login';
  registerUrl: string = 'http://127.0.0.1:8000/api/register';
 
  userIdentity: any;
  isLoggedIn: boolean;

  constructor(private router: Router,private http: Http) {
    // this.carmesUrl = this.loginUrl + '/carte_puce/appCarte.php';
    this.isLoggedIn=false;
  }



  login(data) {
    console.log(data);
    
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
    .post(this.loginUrl, data, options).pipe(map((res)=>{
      this.isLoggedIn= true;
      // console.log('tout de travers');
      return res.json();
    }));     
  }

  register(data) {
    console.log(data);
    
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
    .post(this.registerUrl, data, options).pipe(map((res)=>{
      return res.json();
    }));     
  }
  



  // encodeToken(cpte: string, pin: string) {
  //   let str = cpte + '____=====' + pin;
  //   str = str.split('').reverse().join('');
  //   let token: string = btoa(str);
  //   window.sessionStorage.setItem('prefs', token);
  //   return token;
  // }
  // decodeToken() {
  //   let prefs = window.sessionStorage.getItem('prefs');
  //   prefs = atob(prefs);
  //   prefs = prefs.split('').reverse().join('');
  //   let ids = prefs.split('____=====');
  //   return ids;
  // }
}
export enum CONNEXION {
  AUTHFAIL, CONNECTING, CONNECTED
}

export const AUTH_PROVIDERS: Array<any> = [
  {provide: PrincipalService, useClass: PrincipalService},
 ];
 