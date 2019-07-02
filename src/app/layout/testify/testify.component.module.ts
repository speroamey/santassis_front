import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestifyComponent } from './testify.component';
import { TestifyService } from './testify.service';

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
