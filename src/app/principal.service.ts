import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PrincipalService {

  token: string = '';
  _HOST: string = 'http://172.16.100.212:8181';
  _HOST_MVN = 'http://172.16.100.212:8383';
  loginUrl: string = 'http://164.160.142.15:9711';
  carmesUrl: string;
  cpteCarmes: string = '';
  pin: string = '';
  soldeCarmes: String = null;
  logged: boolean = false;
  public asObservable: Subject<any> = new Subject<any>();
  userIdentity: any;
  constructor() {
    this.carmesUrl = this.loginUrl + '/carte_puce/appCarte.php';
  }
  verifierSoldeCarmes(compteCarmes: string, pin: string, sucessCallback?: Function, errorCallback?: Function) {
    let fd = new FormData();
    fd.append('usrAccount', compteCarmes);
    fd.append("usrPin", pin);
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.overrideMimeType("application/json");
    xhr.open('POST', this.loginUrl + "/web/appSolde.php");
    xhr.onload = () => {
      if (xhr.status == 200)
        if (sucessCallback) sucessCallback(xhr.response);
        else if (errorCallback) errorCallback(xhr.response);
    };
    xhr.send(fd);
  }
  login(cpteCarmes: string, pin: String, sucessCallback?: Function, errorCallback?: Function) {
    this.asObservable.next(true);
  }
  signUp(name: string, phone: string, numCNI: string, sucessCallback?: Function, errorCallback?: Function) {
    let fd = new FormData();
    phone = phone || "";
    if (!(/^(229|229|00229)/.test(phone))) {
      phone = '229' + phone;
    }
    fd.append('userName', name);
    fd.append("userPhone", phone);
    fd.append("userIdNumb", numCNI);
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.overrideMimeType("application/json");
    xhr.open('POST', this.loginUrl + "/web/appCreerCompteCarmes.php");
    xhr.onload = () => {
      if (xhr.status == 200)
        if (sucessCallback) sucessCallback(xhr.response);
        else if (errorCallback) errorCallback(xhr.response);
    };
    xhr.send(fd);
  }
  autoLogin(callBack: Function) {
    let ids = this.decodeToken();
    if (ids && ids[0] && ids[1]) {
      callBack(CONNEXION.CONNECTING);
      this.verifierSoldeCarmes(ids[0], ids[1], (resp) => {
        this.logged = true;
        this.encodeToken(ids[0], ids[1]);
        this.asObservable.next(true);
        this.cpteCarmes = ids[0];
        this.pin = ids[1];
        this.soldeCarmes = resp.message;
        callBack(CONNEXION.CONNECTED);
      }, () => {
        callBack(CONNEXION.AUTHFAIL);
      });
    }
  }
  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userIdentity = null;
      this.logged = false;
      this.asObservable.next(null);
      window.sessionStorage.removeItem('prefs');
      resolve('');
    });
  }
  encodeToken(cpte: string, pin: string) {
    let str = cpte + '____=====' + pin;
    str = str.split('').reverse().join('');
    let token: string = btoa(str);
    window.sessionStorage.setItem('prefs', token);
    return token;
  }
  decodeToken() {
    let prefs = window.sessionStorage.getItem('prefs');
    prefs = atob(prefs);
    prefs = prefs.split('').reverse().join('');
    let ids = prefs.split('____=====');
    return ids;
  }
}
export enum CONNEXION {
  AUTHFAIL, CONNECTING, CONNECTED
}