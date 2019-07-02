import { PrincipalService, CONNEXION } from './shared/services/principal.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare let jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  inactivityTimeout: any;
  constructor(private principal: PrincipalService, private router: Router) {
   
  }
  
    //window.onload = resetTimer;
   
   
  openModal() {
    let connexionModal = jQuery('#connexion');
    connexionModal.modal('show');
  }
}
