import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsService } from './news.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        NewsComponent
    ],
    providers: [
        NewsService,
        /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
      ],
})
export class NewsComponentModule { }
