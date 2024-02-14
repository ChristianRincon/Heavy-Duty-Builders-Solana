import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'balance',
        loadComponent: () =>
        import('./balance-page.component').then((data) => data.BalancePage)
    },
    {
        path: 'settings',
        loadComponent: () =>
        import('./settings-section.component').then((data) => data.SettingsSectionComponent)
    },
    {
        path:'**',
        redirectTo:''
    }
];
