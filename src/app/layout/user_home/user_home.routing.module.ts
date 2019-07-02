import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout.component';
// import { HomeComponent } from './home/home.component';
import {UserProductsComponent} from './product/products.component'
import { UserHomeComponent } from '../user_home/user_home.component';
import { LoggedInGuard } from '../../loggedIn.guard';
import {NewsComponent} from './news/news.component';
import { AddNewsComponent } from './news/news.add.component';
import { ViewNewsComponent } from './news/news.view.component';
import {UserPrestationsComponent} from './prestations/prestations.component'
import {TestifyComponent} from './testify/testify.component'

const routes: Routes = [
    {
        path: '', component: UserHomeComponent,
        children: [
            {
                path: 'products',
                component: UserProductsComponent,
            },

            {
                path: 'news',
                component: NewsComponent,
            },
            {
                path: 'news/add',
                component: AddNewsComponent,
            },
            {
                path: 'news/:id',
                component: ViewNewsComponent,
            },
            {
                path: 'prestations',
                component: UserPrestationsComponent,
            },
            {
                path: 'testify',
                component: TestifyComponent,
            },
           
        ]
    }
];

@NgModule({
    declarations: [
        // UserProductsComponent,
    ],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserHomeRoutingModule { }
