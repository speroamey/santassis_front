import { PrincipalService, CONNEXION } from './principal.service';
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
    this.principal.asObservable.subscribe((res) => {
      this.inactivityHandler();
    });
    this.principal.autoLogin((status: CONNEXION) => {
      if (status == CONNEXION.CONNECTING) {

      } else if (status == CONNEXION.CONNECTED) {

      } else if (status == CONNEXION.AUTHFAIL) {

      }
    });
  }
  inactivityHandler() {
    let resetTimer = () => {
      if (this.inactivityTimeout)
        clearTimeout(this.inactivityTimeout);
      this.inactivityTimeout = setTimeout(logout, 1000 * 60 * 5); // time is in milliseconds (1000 is 1 second)
    }
    //window.onload = resetTimer;
    window.onmousemove = resetTimer; // catches mouse movements
    window.onmousedown = resetTimer; // catches mouse movements
    window.onclick = resetTimer; // catches mouse clicks
    window.onscroll = resetTimer; // catches scrolling
    window.onkeypress = resetTimer; //catches keyboard actions

    let logout = () => {
      this.principal
        .logout()
        .then(() => {
          this.router.navigate([''])
            .then(() => {
              this.openModal();
            });
        })
        .catch(() => { }); //Adapt to actual logout script
    };
    resetTimer();
  }
  openModal() {
    let connexionModal = jQuery('#connexion');
    connexionModal.modal('show');
  }
}
