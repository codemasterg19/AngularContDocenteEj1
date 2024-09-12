import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const sessionsGuard: CanActivateFn = (route, state) => {

  const usersService = inject (UsersService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar); // Inyecta MatSnackBar



  if (usersService.getCurrentUser() === null) {
    snackBar.open('Debe iniciar sesión para acceder a esta página.', 'Cerrar', {
      duration: 3000, // Duración del mensaje (en milisegundos)
      verticalPosition: 'bottom', // Posición del mensaje en la parte superior
      horizontalPosition: 'center', // Posición centrada horizontalmente
    });
    router.navigate(['/login']);
    return false;
  }

  return true;

};
