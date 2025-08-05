import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { RolePaliers } from '../models/role-paliers';

@Injectable({
  providedIn: 'root'
})
export class RolePalierService {

 private baseUrl = 'http://localhost:8088/rolePaliers';

 

  constructor(private http: HttpClient) {}

  // 🔐 Getter pour header avec JWT
  private get headers() {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ Ajouter un RolePalier à un challenge
  addRolePalier(challengeId: number, data: RolePaliers): Observable<RolePaliers> {
    console.log(data);
    return this.http.post<RolePaliers>(`${this.baseUrl}/${challengeId}`, data, { headers: this.headers });
  }

  // ✅ Récupérer tous les RolePaliers d’un challenge
  getByChallenge(challengeId: number): Observable<RolePaliers[]> {
    return this.http.get<RolePaliers[]>(`${this.baseUrl}/byChallenge/${challengeId}`, { headers: this.headers });
  }

  // ✅ Supprimer un RolePalier
  deleteRolePalier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  // ✅ Sauvegarder les détails d’un RolePalier
  saveDetails(rolePalierId: number, body: any): Observable<RolePaliers> {
    return this.http.post<RolePaliers>(`${this.baseUrl}/${rolePalierId}/saveDetails`, body, { headers: this.headers });
  }
}