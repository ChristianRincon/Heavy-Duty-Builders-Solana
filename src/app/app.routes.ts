import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path:'settings',
        loadComponent: () =>
        import('./settings.component').then((data) => data.SettingsComponent)
    },
    {
        path:'balance',
        loadComponent: () => 
        import('./balance-page.component').then((data) => data.BalancePageComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
