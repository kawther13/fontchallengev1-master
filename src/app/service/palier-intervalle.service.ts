import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PalierIntervalle } from '../models/palier-intervalle';


@Injectable({
  providedIn: 'root'
})
export class PalierIntervalleService {

 private baseUrl = 'http://localhost:8088/palierIntervalles';

  constructor(private http: HttpClient) {}

  // 🔐 Getter headers avec token JWT
  private get headers() {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ Ajouter un palier intervalle lié à un RolePalier
  add(rolePalierId: number, data: PalierIntervalle): Observable<PalierIntervalle> {
    return this.http.post<PalierIntervalle>(`${this.baseUrl}/${rolePalierId}`, data, { headers: this.headers });
  }

  // ✅ Récupérer les paliers intervalles d’un RolePalier
  getByRolePalier(rolePalierId: number): Observable<PalierIntervalle[]> {
    return this.http.get<PalierIntervalle[]>(`${this.baseUrl}/byRolePalier/${rolePalierId}`, { headers: this.headers });
  }

  // ✅ Supprimer un palier intervalle par ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}