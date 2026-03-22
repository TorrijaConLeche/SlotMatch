import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { GroupDashboardComponent } from './components/group-dashboard-component/group-dashboard-component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    }, 
        {
        path: 'group/:slug',
        component: GroupDashboardComponent
    },
        {
        path: '**',
        redirectTo: ''
    }
];
