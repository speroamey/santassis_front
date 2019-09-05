import { Component, OnInit } from "@angular/core";
import { PrincipalService } from "../services/principal.service";
import { Router } from '@angular/router';
import { Response } from "@angular/http";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";

declare let SmoothScroll: any;
declare let jQuery: any;

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
    isSaving: boolean;
    error: string = '';
    errorSignUp: string = '';
    model: any = {};
    loading: boolean;
    data: boolean;
    isAuthenticated: boolean;
    reset: any= {};
    message: string;
    validationErrors = [];

    constructor(private router: Router, public principal: PrincipalService) { 
        this.isAuthenticated=false;
        this.validationErrors = []
    }

    ngOnInit() {
        SmoothScroll();
    }

    login() {
        if (!this.model.username &&!this.model.password) return;
        this.isSaving = true;
        this.principal.login(this.model)
            .subscribe((result) => {
                // console.log(result);
                this.isSaving = false;
                localStorage.setItem('authenticationtoken', result.access_token);
                localStorage.setItem('refreshtoken', result.refresh_token);
                localStorage.setItem('auth', 'true');
                this.isAuthenticated=true;
                this.closeModal();
                this.connectedUser();
                var x = jQuery('#snackId');
                // Add the "show" class to DIV
                x.className = "show";

                // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                this.model={};
                // this.data=result;
                // this.router.navigate(['/']);
            }, 
            (error)=>{
                // console.log("something",error);
                this.isSaving = false;
                console.log(error);
                this.model={};
                this.error= error.json().message;
                // this.toastr.error('Erreur!', 'Identifiants Incorrect!');
        });
    }
    
    get isLogin(){
        if( localStorage.getItem('authenticationtoken')){
         return true;
        }else{
            return false
        }
    }
    credentials(credentials: any): any {
        throw new Error("Method not implemented.");
    }


    register() {
        if (!this.model.name || !this.model.phone || !this.model.email) return;
        this.errorSignUp="";
        this.validationErrors=[];
        this.isSaving = true;
        this.principal.register(this.model)
        .subscribe( (resp) => {
            console.log(resp);
            this.isSaving = false;
            this.closeModal();
            this.model={};
            this.message = 'Félictation votre Inscription a été pris en compte, Un mail vous a été envoyé, veuillez prendre connaissance des informations nécessaires pour pouvoir vous connecter '
            jQuery('#info-token').modal('show');
        }, 
            (error : HttpErrorResponse | any) => {
            // console.log('whats going wrong 1');
           
            
            // let e= JSON.parse(error)
            console.log('cest xa mm', error);
            console.log(error instanceof HttpErrorResponse);
            

                const errorMessages = new Array<{ propName: string; errors: string }>();
            
            if (error.status === 422) {
                    console.log('condition 2', error.json());
                    const data = JSON.parse(error._body)
                    const fields = Object.entries(data || {});
                    console.log(fields[1][1]);
                    const mapped = Object.keys(fields[1][1]).map(key => ({champ: key, value: fields[1][1][key]}));
                    console.log(mapped);
                    this.validationErrors = mapped;
                    
                  // TODO: extract errors here and match onto the form
            }
            

            console.log('whats going wrong 2');
            this.errorSignUp = "Une erreur s'est produite lors de l'opération,Veuillez réessayer";
            this.isSaving = false;
            // this.model={};
        });
    }

    closeModal() {
        let connexionModal = jQuery('#creation,#connexion');
        connexionModal.modal('hide');
    }

    disconnect(){
        this.principal.getDisconnect()
        .subscribe( (resp) => {
            // console.log(resp);
            this.router.navigate(['/layout/home']);
            localStorage.removeItem('authenticationtoken');
            localStorage.removeItem('refreshtoken');
        }, (error) => {
            console.log(error);
        });
    }
    openResetModal(){
        jQuery('#connexion').modal('hide');
        jQuery('#resetingPasswordToken').modal('show');
    }

    resetingPasswordToken(){
        this.isSaving = true;
        this.principal.resetingPasswordToken(this.reset)
        .subscribe( (resp) => {
          
            console.log(resp);
            // this.router.navigate(['/layout/home']);
            jQuery('#resetingPasswordToken').modal('hide');
            this.isSaving = false;
            this.message = resp.message || 'Un mail vous a été envoyé, veuillez vous connecter a votre boite mail pour réinitialiser votre mot de passe'
            jQuery('#info-token').modal('show');
        }, (error) => {
            console.log(error);
            jQuery('#resetingPasswordToken').modal('hide');
            this.isSaving = false;
            
            this.message = error.message || 'Une erreur est survenue, merci de réessayer ultérieurement'
            jQuery('#info-token').modal('show');
        });
    }

    connectedUser() {
        this.principal.connectedUser ()
        .subscribe( (resp) => {
            console.log(resp);
           this.model={};
        }, (error) => {
            console.log(error);
        });
    }
}