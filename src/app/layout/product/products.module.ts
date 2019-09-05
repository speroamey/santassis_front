import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';

import { ProductsComponent } from './products.component';
import { UserProductsService } from './products.service';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {CustomMaxDirective} from './custom-max-validator.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ContactUsComponent }  from '../contact-us/contact-us.component'
import {ContactUsComponentModule} from '../contact-us/contact-us.component.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        ContactUsComponentModule,
        AppRoutingModule
        
    ],
    declarations: [
        ProductsComponent,
        ContactUsComponent,
        CustomMaxDirective
    ],
    providers: [
        UserProductsService,
        /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
    ],
})
export class ProductsComponentModule { }
