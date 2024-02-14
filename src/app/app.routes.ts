import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'balance',
        loadComponent: () =>
        import('./balance-page.component').then((data) => data.BalancePage)
    },
    {
        path: 'transaction',
        loadComponent: () =>
        import('./transaction-page.component').then((data) => data.TransactionPage)
    },
    {
        path:'**',
        redirectTo:''
    }
];
