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
import {UserProfileModule} from './profile/profile.module'
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { UserUsersModule } from './users/users.module';
import { UserCommandsModule } from './commands/commands.module';

@NgModule({
    imports: [
        CommonModule,
        UserProductsModule,
        UserHomeRoutingModule,
        NgxPaginationModule,
        NewsComponentModule,
        UserPrestationsModule,
        TestifyComponentModule,
        UserProfileModule,
        UserUsersModule,
        UserCommandsModule
    ],
    declarations: [
        UserHomeComponent,
        SidenavComponent
    ]
})
export class UserHomeModule { }
