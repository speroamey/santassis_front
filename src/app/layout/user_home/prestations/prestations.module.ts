import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserPrestationsComponent } from './prestations.component';
import { UserPrestationsService } from './prestations.service';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule
    ],
    declarations: [
        UserPrestationsComponent
    ],
    providers: [
        UserPrestationsService,
        /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
    ],
})
export class UserPrestationsModule { }
