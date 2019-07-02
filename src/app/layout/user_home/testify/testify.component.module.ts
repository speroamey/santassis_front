import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestifyService } from './testify.service';
import {TestifyComponent} from './testify.component'
@NgModule({
    imports: [
        CommonModule,
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
