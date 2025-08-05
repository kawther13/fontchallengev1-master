import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private url = 'http://127.0.0.1:8088/api/v1/auth/';

  constructor(private http: HttpClient) {}

  login(data: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.url + 'authenticate', data)
      .pipe(
        tap(response => {
          localStorage.setItem('jwt', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  

  isLoggedIn(): boolean {
    return !!this.getToken();
  }



  getRoleFromToken(): string | null {
  const token = localStorage.getItem('jwt');
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.role || null;
  } catch (e) {
    console.error('Erreur de décodage JWT :', e);
    return null;
  }
}


}