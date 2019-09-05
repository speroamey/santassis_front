import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Router, } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { PrincipalService } from '../../../shared/services/principal.service';
import { HOST, createRequestOption } from '../../../request-util';

@Injectable()
export class UserProfileService {

  private ProfileUrl: string = HOST + 'user';
  private ProfileAvatarUrl: string = HOST + 'user-avatar';
  private DisconnectUrl: string = HOST + 'disconnect';

  req:any={};
  constructor(private router: Router, private http: Http, principal: PrincipalService) {
    // this.carmesUrl = this.loginUrl + '/carte_puce/appCarte.php';
  }

  getProfile() {
    const options: BaseRequestOptions = createRequestOption(this.req);
    //options.headers.append('Content-Type','application/json')
    return this.http
      .get(this.ProfileUrl, options).pipe(map((res) => {
        return res.json();
      }));
  }

  updateProfile(data) {
    
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json')
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );
    return this.http
      .put(this.ProfileUrl, data, options).pipe(map((res) => {
        return res.json();
      }));
  }


  updateProfileAvatar(data) {
    console.log(data);
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json')
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );
    return this.http
      .put(this.ProfileAvatarUrl, data, options).pipe(map((res) => {
        return res.json();
      }));
  }

  updatePassword(){

  }

  updateImage(){
    
  }

}
