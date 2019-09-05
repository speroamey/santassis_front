import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserCommandsComponent } from './commands.component';
import { UserCommandsService } from './commands.service';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {CustomMaxDirective} from './custom-max-validator.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule,
    ],
    declarations: [
        UserCommandsComponent,
        CustomMaxDirective
    ],
    providers: [
        UserCommandsService,
        /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
    ],
})
export class UserCommandsModule { }
