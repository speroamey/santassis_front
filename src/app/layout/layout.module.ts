import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout.routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../shared/header/header.component';
import { UserHomeModule } from './user_home/user_home.module';
import { ProductsComponentModule } from './product/products.component.module'
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LayoutRoutingModule,
        ProductsComponentModule,
        UserHomeModule,
        NgxPaginationModule,
      
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent
    ]
})
export class LayoutModule { }
