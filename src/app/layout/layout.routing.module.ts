import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import {ProductsComponent} from './product/products.component'
import { LoggedInGuard } from '../loggedIn.guard';
import { UserHomeComponent } from './user_home/user_home.component';

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
                component: ProductsComponent,
            },
            {
                path: 'user-home',
                loadChildren: 'app/layout/user_home/user_home.module#UserHomeModule',
                // canActivate: [LoggedInGuard]
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
        HomeComponent,
    ],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
