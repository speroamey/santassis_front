import { Component, OnInit } from "@angular/core";
import { PrincipalService } from "../services/principal.service";
import { Router } from '@angular/router';
import { RouterModule, ActivatedRoute } from '@angular/router';

declare let SmoothScroll: any;
declare let jQuery: any;

@Component({
    selector: 'reset-component',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})

export class ResetPasswordComponent implements OnInit {
    isSaving: boolean;
    error: string = '';
    errorSignUp: string = '';
    model: any = {};
    loading: boolean;
    data: boolean;
    isAuthenticated: boolean;
    current: any;
    message: any;

    constructor(private router: Router, public principal: PrincipalService, private route: ActivatedRoute) { 
        this.isAuthenticated=false;
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            console.log(params);
            if (params['id']) {
              this.current = params['id'];
              this.verifyToken();
            }
          });

    }
    verifyToken() {
        this.principal.checkToken (this.current)
        .subscribe( (resp) => {
            console.log(resp);
           this.model={};
           jQuery('#resetPassword').modal('show');
        }, (error) => {
            console.log(error);
            jQuery('#info-token').modal('show');
            this.message = error.message || 'Ce Token est invalide'
        });
    }



    resetPassword() {
        this.model.token = this.current;
        this.principal.resetPassword (this.model)
        .subscribe( (resp) => {
            console.log(resp);
           this.model={};
           this.message = resp.message || 'Succès de la réinitialisation de mot de passe;'
           jQuery('#resetPassword').modal('show');
        }, (error) => {
            console.log(error);
            this.message = error.message || 'Une erreur est survenue, merci de réessayer ultérieurement'
            jQuery('#info-token').modal('show');

        });
    }

    closeModal() {
        let connexionModal = jQuery('#resetPassword,#info-token');
        connexionModal.modal('hide');
        this.router.navigate(['/layout/home']);
    }


    
  



}