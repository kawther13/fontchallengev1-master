import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { PalierClassement } from '../models/palier-classement';

@Injectable({
  providedIn: 'root'
})
export class PalierClassementService {

   private baseUrl = 'http://localhost:8088/palierClassements';

  constructor(private http: HttpClient) {}

  // 🔐 Header JWT dynamique
  private get headers() {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ Ajouter un palier de classement lié à un RolePalier
  add(rolePalierId: number, data: PalierClassement): Observable<PalierClassement> {
    return this.http.post<PalierClassement>(`${this.baseUrl}/${rolePalierId}`, data, { headers: this.headers });
  }

  // ✅ Récupérer les paliers de classement d’un RolePalier
  getByRolePalier(rolePalierId: number): Observable<PalierClassement[]> {
    return this.http.get<PalierClassement[]>(`${this.baseUrl}/byRolePalier/${rolePalierId}`, { headers: this.headers });
  }

  // ✅ Supprimer un palier de classement par ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}