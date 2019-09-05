import { Component } from '@angular/core';
import { PrincipalService } from '../services/principal.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent {
    isActive = false;
    showMenu = '';
    public role:boolean = false;
    username: string;

    constructor( public principal: PrincipalService){

    }
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    ngOnInit(){
        this.user_role()
        // this.role=sessionStorage.getItem('roles');
        this.username = sessionStorage.getItem('username');
    }

   user_role(){
       this.principal.connectedUser()
        .subscribe( (resp) => {
            console.log(resp.data.role);
            if(resp.data.role == "ADMIN"){
                this.role = true
            }else{
                this.role = false
            }
        }, (error) => {
            console.log(error);
        });
   }
}