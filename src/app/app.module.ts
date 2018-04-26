import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

import {LayoutModule}  from './layout/layout.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,  
  ],
  providers: [
   /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
