import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const jwtToken = localStorage.getItem('jwt'); // Ton token est stocké ici après login
  console.log('🔐 Interception d\'une requête HTTP...');
  console.log('➡️ URL:', req.url);
  console.log('🔍 Méthode:', req.method);
  console.log('🧪 Token trouvé ?', jwtToken ? '✅ OUI' : '❌ NON');

  if (jwtToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });

    console.log('✅ Requête modifiée avec token :', clonedRequest);
    return next.handle(clonedRequest);
  }

  console.warn('⚠️ Aucun token trouvé, requête envoyée sans modification.');
  return next.handle(req); // Aucune modification si pas de token
}


   
}

