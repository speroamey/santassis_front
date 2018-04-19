import { Component, OnInit } from "@angular/core";
declare let  SmoothScroll:any;

@Component({
    selector:'header-component',
    templateUrl:'./header.component.html',
})

export class HeaderComponent implements OnInit{
    constructor() { }

    ngOnInit() {
        SmoothScroll();
    }
}