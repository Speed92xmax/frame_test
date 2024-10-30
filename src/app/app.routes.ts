import { Routes } from '@angular/router';
import { HomeManagerComponent } from './modules/home-manager/home-manager.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeManagerComponent
    }
];
