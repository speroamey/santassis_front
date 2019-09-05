import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestationsComponent } from './prestations.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';

import { PrestationsService } from './prestations.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AppRoutingModule
    ],
    declarations: [
        PrestationsComponent
    ],
    providers: [
        PrestationsService,
        /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
      ],
})
export class PrestationsComponentModule { }
