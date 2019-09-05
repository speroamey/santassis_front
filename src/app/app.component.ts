import { PrincipalService, CONNEXION } from './shared/services/principal.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare let jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  inactivityTimeout: any;
  isLoggedIn: boolean;
  constructor(private principal: PrincipalService, private router: Router) {
   
  }
  ngOnInit(){
    console.log("alert");
    // window.reload()
    
  }
    //window.onload = resetTimer;
   
 
}
