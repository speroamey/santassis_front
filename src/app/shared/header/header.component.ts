import { Component, OnInit } from "@angular/core";
import { PrincipalService } from "../../principal.service";
declare let SmoothScroll: any;
declare let jQuery: any;

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
    isSaving: boolean;
    error: string = '';
    errorSignUp: string = '';

    model: any = {
        cpteCarmes: '',
        pin: '',
        name: '',
        phone: '',
        numCNI: ''
    };
    constructor(public principal: PrincipalService) { }

    ngOnInit() {
        SmoothScroll();
    }
    login() {
        if (!this.model.cpteCarmes || !this.model.pin) return;
        this.isSaving = true;
        this.principal.verifierSoldeCarmes(this.model.cpteCarmes, this.model.pin, (resp) => {
            if (resp.message == 'Compte CARMES incorrect')
                this.error = "Le compte CARMES est incorrect";
            else if (resp.message == 'Code PIN incorrect')
                this.error = "Le code PIN est incorrect";
            else if (resp.message.indexOf('Votre solde') == 0) {
                this.error = '';
                this.principal.logged = true;
                this.principal.encodeToken(this.model.cpteCarmes, this.model.pin);
                this.principal.asObservable.next(true);
                this.principal.cpteCarmes = this.model.cpteCarmes;
                this.principal.pin = this.model.pin;
                this.principal.soldeCarmes = resp.message;
                this.model.pin = '';
                this.closeModal();
            }
            this.isSaving = false;
        }, () => {
            this.error = "Une erreur s'est produite lors de la connexion,Veuillez réessayer s'il vous plaît"; this.isSaving = false;
        });
    }
    signUp() {
        if (!this.model.name || !this.model.phone || !this.model.numCNI) return;
        this.isSaving = true;
        this.principal.signUp(this.model.name, this.model.phone, this.model.numCNI, (resp) => {
            this.isSaving = false;
            if (resp.message.indexOf('*')) {
                let tabResp = resp.message.split('*');
                this.principal.cpteCarmes = tabResp[0];
                this.principal.pin = tabResp[1];
                if (!tabResp[0] || !tabResp[1]) {
                    this.error = "Une erreur inattendue s'est produite";
                } else {
                    this.error = '';
                    this.principal.logged = true;
                    this.principal.encodeToken(tabResp[0], tabResp[1]);
                    this.principal.asObservable.next(true);
                    this.closeModal();
                    this.model.name = '';
                    this.model.phone = '';
                    this.model.numCNI = '';
                }

            } else {
                this.error = "Une erreur inattendue s'est produite";
            }
        }, () => {
            this.error = "Une erreur s'est produite lors de la connexion,Veuillez réessayer s'il vous plaît";
            this.isSaving = false;
        });
    }
    closeModal() {
        let connexionModal = jQuery('#creation,#connexion');
        connexionModal.modal('hide');
    }
}