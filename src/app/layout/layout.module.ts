import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout.routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../shared/header/header.component';
import {HomeComponentModule} from './home/home.component.module'

@NgModule({
    imports: [
        CommonModule,
        /* HomeComponentModule, */
        LayoutRoutingModule,
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent
    ]
})
export class LayoutModule { }
