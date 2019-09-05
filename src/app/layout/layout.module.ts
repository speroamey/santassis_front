import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout.routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { UserHomeModule } from './user_home/user_home.module';
import { ProductsComponentModule } from './product/products.module'
import { NewsComponentModule } from './news/news.component.module'
import { HomeComponentModule} from './home/home.component.module'

import { TestifyComponentModule } from './testify/testify.component.module'
import { PrestationsComponentModule } from './prestations/prestations.component.module'
import {AboutUsComponentModule} from './about-us/about-us.component.module'

import {EqualValidator} from './custom-password-validation.directive'

import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HomeComponentModule,
        LayoutRoutingModule,
        NewsComponentModule,
        UserHomeModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        AboutUsComponentModule              
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        EqualValidator,
        
    ]
})
export class LayoutModule { }
