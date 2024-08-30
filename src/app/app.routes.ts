import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListaproductoComponent } from './pages/listaproducto/listaproducto.component';
import { AcercadeComponent } from './pages/acercade/acercade.component';
import { Error404Component } from './pages/error404/error404.component';
import { InfoproductoComponent } from './pages/infoproducto/infoproducto.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [

    {path: 'home', component: HomeComponent},
    {path: 'listaproducto', component: ListaproductoComponent},
    {path: 'listaproducto/:id', component: InfoproductoComponent},
    { path: 'login', component: LoginComponent },
    {path: 'acercade', component: AcercadeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: Error404Component}

];
