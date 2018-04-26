import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { UserhomeComponent } from './home/user_home.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'home', 
             component:HomeComponent,
         },
         {
            path:'',
            redirectTo:'home'
        },
        {
            path: 'user_home',
            component: UserhomeComponent
        }
        ]
    }
];

@NgModule({
    declarations:[
     HomeComponent,
     UserhomeComponent
    ],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
