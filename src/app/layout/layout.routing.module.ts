import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import {ProductsComponent} from './product/products.component'
import {NewsComponent} from './news/news.component'
import {TestifyComponent} from './testify/testify.component'
import {PrestationsComponent} from './prestations/prestations.component'
import {AboutUsComponent} from './about-us/about-us.component'

import { LoggedInGuard } from '../loggedIn.guard';
import { UserHomeComponent } from './user_home/user_home.component';
import { ViewNewsComponent } from './news/news.view.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'products',
                loadChildren: 'app/layout/product/products.module#ProductsComponentModule',
            },
            {
                path: 'news',
                loadChildren: 'app/layout/news/news.component.module#NewsComponentModule',
            },
            {
                path: 'news/:id',
                loadChildren: 'app/layout/news/news.component.module#NewsComponentModule',
            },
            
            {
                path: 'prestations',
                loadChildren: 'app/layout/prestations/prestations.component.module#PrestationsComponentModule',
            },

            {
                path: 'testify',
                loadChildren: 'app/layout/testify/testify.component.module#TestifyComponentModule',
            },
            {
                path: 'about_us',
                loadChildren: 'app/layout/about-us/about-us.component.module#AboutUsComponentModule',
            },
            {
                path: 'user-home',
                loadChildren: 'app/layout/user_home/user_home.module#UserHomeModule',
                canActivate: [LoggedInGuard]
            },
            {
                path: '**',
                redirectTo: 'home'
            },
        ]
    }
];

@NgModule({
    declarations: [
        
    ],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
