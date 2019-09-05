import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserProductsComponent } from './products.component';
import { UserProductsService } from './products.service';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {CustomMaxDirective} from './custom-max-validator.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        
    ],
    declarations: [
        UserProductsComponent,
        CustomMaxDirective
    ],
    providers: [
        UserProductsService,
        /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
    ],
})
export class UserProductsModule { }
