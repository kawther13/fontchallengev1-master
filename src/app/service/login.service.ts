import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
url='http://127.0.0.1:8088/auth/'
constructor(private http: HttpClient) { }

login(data: any) {
  return this.http.post<any>(this.url + 'login', data)
    .pipe(
      tap((response: { success: any; token: string; user: { role: string; username: string; id: { toString: () => string; }; }; }) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.user.role);
          localStorage.setItem('username', response.user.username);
          localStorage.setItem('userId', response.user.id.toString());
        }
      })
    );
}


getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
