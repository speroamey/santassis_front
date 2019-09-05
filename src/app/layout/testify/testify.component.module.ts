import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestifyComponent } from './testify.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';

import { TestifyService } from './testify.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AppRoutingModule
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
