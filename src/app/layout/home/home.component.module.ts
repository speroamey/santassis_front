import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutUsService } from '../about-us/about-us.service';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import {NewsService} from '../news/news.service'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [
        AboutUsService,
        NewsService
    ],
})
export class HomeComponentModule { }
