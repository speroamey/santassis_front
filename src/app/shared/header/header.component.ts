import { Component, OnInit } from "@angular/core";
import { PrincipalService } from "../services/principal.service";
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

    constructor(public principal: PrincipalService) { 
        this.isAuthenticated=false;
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
                this.isAuthenticated=true;
                this.closeModal();
                // this.data=result;
                // this.router.navigate(['/']);
            }, 
            (error)=>{
                // console.log("something",error);
                this.isSaving = false;
                this.error="Erreur d'authentification";
                // this.toastr.error('Erreur!', 'Identifiants Incorrect!');
        });
    }
    
    credentials(credentials: any): any {
        throw new Error("Method not implemented.");
    }


    register() {
        if (!this.model.name || !this.model.phone || !this.model.email) return;
        this.isSaving = true;
        this.principal.register(this.model)
        .subscribe( (resp) => {
            console.log(resp);
            this.isSaving = false;
           this.closeModal();
        }, (error) => {
            console.log(error);
            this.error = "Une erreur s'est produite lors de l'opération,Veuillez réessayer";
            this.isSaving = false;
        });
    }

    closeModal() {
        let connexionModal = jQuery('#creation,#connexion');
        connexionModal.modal('hide');
    }
}