import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'home', data: { breadcrumb: 'Home' }, loadChildren: () => import('../demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'users', data: { breadcrumb: 'Users' }, loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule) },
        { path: 'roles', data: { breadcrumb: 'Roles' }, loadChildren: () => import('./components/roles/roles.module').then(m => m.RolesModule) },
        { path: 'clients', data: { breadcrumb: 'Clients' }, loadChildren: () => import('./components/clients/clients.module').then(m => m.ClientsModule) },
        { path: 'suppliers', data: { breadcrumb: 'Suppliers' }, loadChildren: () => import('./components/suppliers/suppliers.module').then(m => m.SuppliersModule) },
        { path: 'services', data: { breadcrumb: 'Services' }, loadChildren: () => import('./components/services/services.module').then(m => m.ServicesModule) },
        // { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./formlayout/formlayoutdemo.module').then(m => m.FormLayoutDemoModule) },
        // { path: 'input', data: { breadcrumb: 'Input' }, loadChildren: () => import('./input/inputdemo.module').then(m => m.InputDemoModule) },
        // { path: 'invalidstate', data: { breadcrumb: 'Invalid State' }, loadChildren: () => import('./invalid/invalidstatedemo.module').then(m => m.InvalidStateDemoModule) },
        // { path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list/listdemo.module').then(m => m.ListDemoModule) },
        // { path: 'media', data: { breadcrumb: 'Media' }, loadChildren: () => import('./media/mediademo.module').then(m => m.MediaDemoModule) },
        // { path: 'message', data: { breadcrumb: 'Message' }, loadChildren: () => import('./messages/messagesdemo.module').then(m => m.MessagesDemoModule) },
        // { path: 'misc', data: { breadcrumb: 'Misc' }, loadChildren: () => import('./misc/miscdemo.module').then(m => m.MiscDemoModule) },
        // { path: 'overlay', data: { breadcrumb: 'Overlay' }, loadChildren: () => import('./overlays/overlaysdemo.module').then(m => m.OverlaysDemoModule) },
        // { path: 'panel', data: { breadcrumb: 'Panel' }, loadChildren: () => import('./panels/panelsdemo.module').then(m => m.PanelsDemoModule) },
        // { path: 'table', data: { breadcrumb: 'Table' }, loadChildren: () => import('./table/tabledemo.module').then(m => m.TableDemoModule) },
        // { path: 'tree', data: { breadcrumb: 'Tree' }, loadChildren: () => import('./tree/treedemo.module').then(m => m.TreeDemoModule) },
        // { path: 'menu', data: { breadcrumb: 'Menu' }, loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule) },
        // { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
