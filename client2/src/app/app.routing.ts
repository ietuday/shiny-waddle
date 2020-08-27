import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
    { path: '', loadChildren: './pages/login/login.module#LoginModule' },
    { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
    { 
        path: 'page', 
        component: PagesComponent, children: [
            { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' } },
            { path: 'users', loadChildren: './pages/users/users.module#UsersModule', data: { breadcrumb: 'Users' } },
         
        ]
    },
    // { path: '**', loadChildren: './pages/login/login.module#LoginModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   useHash: true
});