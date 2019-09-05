import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserUsersComponent } from './users.component';
import { UserUsersService } from './users.service';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {CustomMaxDirective} from './custom-max-validator.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        
    ],
    declarations: [
        UserUsersComponent,
        CustomMaxDirective
    ],
    providers: [
        UserUsersService,
        /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
    ],
})
export class UserUsersModule { }
