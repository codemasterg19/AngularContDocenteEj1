import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Path } from '../../utils/path';
import { UsersService } from '../../services/users/users.service';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  paths: Path[] = [
    { path: '/home', nombre: 'Home' },
    { path: '/listaproducto', nombre: 'Productos' },
    { path: '/acercade', nombre: 'Nosotros' }
  ];
  constructor(private router:Router ,private usersService:UsersService){ }

  isLogged(): boolean{
    return this.usersService.getCurrentUser()!== null;
   }

   logout():void{
    this.usersService.logout();
    this.router.navigate(['/login']);
  }
}
