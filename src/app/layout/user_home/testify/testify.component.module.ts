import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestifyService } from './testify.service';
import {TestifyComponent} from './testify.component'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    declarations: [
        TestifyComponent
    ],
    providers: [
        TestifyService,
        /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
      ],
})
export class TestifyComponentModule { }
