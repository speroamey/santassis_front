import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {map, catchError} from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HOST, createRequestOption } from '../../request-util';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PrincipalService {

  token: string = '';

  loginUrl: string = HOST + 'login';
  registerUrl: string = HOST + 'register';
  resetingPassTokenUrl: string = HOST + 'create-pass-token';
  checkTokenUrl: string = HOST + 'find';
  resetPasswordUrl: string = HOST + 'reset';
  disconnectUrl: string = HOST + 'logout';
  userUrl: string = HOST + 'user';

  userIdentity: any;
  isLoggedIn: boolean;
  req:any={};
  
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
    // console.log(data);
    
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
    .post(this.registerUrl, data, options)
      .pipe(map((res)=>{
        return res.json();
      })
      )
      // .catch(this.handleError);    
  }
  
  handleError(error: HttpErrorResponse){
    // console.error(error);
    // console.log('inHandleErrors',error.toString());
    return error
  }

  resetingPasswordToken(data) {
    console.log(data);
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
    .post(this.resetingPassTokenUrl, data, options).pipe(map((res)=>{
      return res.json();
    }));     
  }

  checkToken(id) {
    console.log(id);
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
    .get( `${this.checkTokenUrl}/${id}`, options).pipe(map((res)=>{
      return res.json();
    }));     
  }

  resetPassword(data) {
    console.log(data);
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
    .post(this.resetPasswordUrl, data, options).pipe(map((res)=>{
      return res.json();
    }));     
  }


  getDisconnect() {
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json');    
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );
    
    return this.http
      .get(this.disconnectUrl, options).pipe(map((res)=>{
        return res.json();
    }));     
  }


  connectedUser(){
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json');    
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );
    
    return this.http
      .get(this.userUrl, options).pipe(map((res)=>{
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
 