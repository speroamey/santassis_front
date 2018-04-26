import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PrincipalService {
  token: string = '';
  _HOST: string = 'http://172.16.100.212:8181';
  _HOST_MVN = 'http://172.16.100.212:8383';
  loginUrl: string = 'http://164.160.142.15:9711';
  carmesUrl: string;
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

  }
  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userIdentity = null;
      resolve('');
    });
  }
}
