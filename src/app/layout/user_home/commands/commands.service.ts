import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Router, } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { PrincipalService } from '../../../shared/services/principal.service';
import { HOST, createRequestOption } from '../../../request-util';

@Injectable()
export class UserCommandsService {

  private UsersUrl: string = HOST + 'users';
  private CommandsUrl: string = HOST + 'commands';
  private CommandsLineCommandsUrl: string = HOST + 'command-lines-commands';
  req:any={};

  constructor(private router: Router, private http: Http, principal: PrincipalService) {
    // this.carmesUrl = this.loginUrl + '/carte_puce/appCarte.php';
  }

  getCommands(page?) {
    this.req.page=page;
    // this.req.size=10;
    const options: BaseRequestOptions = createRequestOption(this.req);
    // options.headers.append('Content-Type','application/json')
    return this.http
      .get(this.CommandsUrl, options).pipe(map((res) => {
        return res.json();
      }));
  }

  getCommandLinesCommands(id) {
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json')
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );
    return this.http
      .get(`${this.CommandsLineCommandsUrl}/${id}`, options).pipe(map((res) => {
        return res.json();
      }));
  }

  
 

  updateUserStatus(data) {
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type', 'application/json')
    options.headers.append('Authorization','Bearer ' + localStorage.authenticationtoken );
    return this.http
      .put(`${this.UsersUrl}/${data.id}`, data, options).pipe(map((res) => {
        return res.json();
      }));
  }



}
