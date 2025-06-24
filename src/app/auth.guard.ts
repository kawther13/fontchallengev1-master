

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    // ✅ Autorisé : le token existe
    return true;
  } else {
    // 🚫 Non autorisé : pas de token → redirection vers /login
    router.navigate(['/login']);
    return false;
  }
};
