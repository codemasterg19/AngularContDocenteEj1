import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListaproductoComponent } from './pages/listaproducto/listaproducto.component';
import { AcercadeComponent } from './pages/acercade/acercade.component';
import { Error404Component } from './pages/error404/error404.component';
import { InfoproductoComponent } from './pages/infoproducto/infoproducto.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { sessionsGuard } from './guards/sessions.guard';

export const routes: Routes = [

    {path: 'home', component: HomeComponent},
    {path: 'listaproducto', component: ListaproductoComponent},
    {path: 'producto/:id', component: InfoproductoComponent, canActivate: [sessionsGuard]},
    {path: 'login', component: LoginComponent },
    {path: 'acercade', component: AcercadeComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'carrito', component: CarritoComponent, canActivate: [sessionsGuard]},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: Error404Component}

];
