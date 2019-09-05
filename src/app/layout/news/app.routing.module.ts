import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from './news.component'
import {ViewNewsComponent} from './news.view.component'

const routes: Routes = [
    {
        path: '',
        component:NewsComponent
    },
   
    {
        path: ':id',
        component:ViewNewsComponent
    },

    { path: '**', redirectTo: 'not-found' } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
