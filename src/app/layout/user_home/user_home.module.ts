import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProductsModule } from './product/products.module'
import { FormsModule } from '@angular/forms';
import { UserHomeComponent } from './user_home.component';
import { UserHomeRoutingModule } from './user_home.routing.module';
import {UserProductsComponent} from './product/products.component'
import {NgxPaginationModule} from 'ngx-pagination'; 
import {NewsComponentModule} from './news/news.component.module'
import {UserPrestationsModule} from './prestations/prestations.module'
import {TestifyComponentModule} from './testify/testify.component.module'

@NgModule({
    imports: [
        UserProductsModule,
        UserHomeRoutingModule,
        NgxPaginationModule,
        NewsComponentModule,
        UserPrestationsModule,
        TestifyComponentModule
    ],
    declarations: [
        UserHomeComponent
    ]
})
export class UserHomeModule { }
