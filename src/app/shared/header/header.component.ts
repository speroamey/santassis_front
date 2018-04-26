import { Component, OnInit } from "@angular/core";
import { PrincipalService } from "../../principal.service";
declare let  SmoothScroll:any;

@Component({
    selector:'header-component',
    templateUrl:'./header.component.html',
})

export class HeaderComponent implements OnInit{
    isSaving:boolean;
    model:any = {
        cpteCarmes:'',
        pin:'',
        name:'',
        phone:'',
        numCNI:''
    };
    constructor(private principal: PrincipalService) { }

    ngOnInit() {
        SmoothScroll();
    }
    login(){
        this.isSaving = true;
        this.principal.verifierSoldeCarmes(this.model.cpteCarmes, this.model.pin, () => { this.isSaving = false;}, () => { this.isSaving = false;});
    }
    signUp() {
        this.isSaving = true;
        this.principal.signUp(this.model.name, this.model.phone, this.model.numCNI, () => {
            this.isSaving = false;
         }, () => {
             this.isSaving = false;
          });
    }
}