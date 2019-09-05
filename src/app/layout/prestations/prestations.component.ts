import { Component, OnInit } from '@angular/core';
import { PrestationsService } from './prestations.service'
declare let SmoothScroll: any;

@Component({
  selector: 'app-prestations',
  templateUrl: './prestations.component.html',
  styleUrls: ['./prestations.component.css']
})

export class PrestationsComponent implements OnInit {
  loading: boolean = false;
  prestations: any;
  prestation: {};
  constructor(private prestationsService: PrestationsService) { 
    this.prestations = [];
    this.prestations = {};
  }

  ngOnInit() {
    SmoothScroll();
    this.loadTestifies();
  }

  loadTestifies() {
    this.loading=true;
    this.prestationsService.getPrestations()
      .subscribe(
        (resp) => {
          console.log(resp);
          this.prestations = resp.data;
          this.loading=false;
        },
        (error) => {
          console.log(error);
          return;
        }
      )
  }
}
