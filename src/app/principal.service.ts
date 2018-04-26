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
  private asObservable: Subject<any> = new Subject<any>();
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
  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userIdentity = null;
      this.logged = false;
      resolve('');
    });
  }
}
