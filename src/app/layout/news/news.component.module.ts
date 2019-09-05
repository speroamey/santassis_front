import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { AppRoutingModule } from './app.routing.module';

import { NewsService } from './news.service';
import { RouterModule } from '@angular/router';
import { ViewNewsComponent } from './news.view.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AppRoutingModule
    ],
    declarations: [
        NewsComponent,
        ViewNewsComponent
    ],
    providers: [
        NewsService,
        /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
      ],
})
export class NewsComponentModule { }
