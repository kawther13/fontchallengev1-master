import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Condition } from '../models/condition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

 private baseUrl = 'http://localhost:8088/api/conditions';

  constructor(private http: HttpClient) {}

  // 🔐 Header JWT dynamique
  private get headers() {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ Créer une nouvelle condition pour un challenge donné
  createCondition(condition: any, challengeId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${challengeId}`, condition, { headers: this.headers });
  }

  // ✅ Récupérer toutes les conditions
  getConditions(): Observable<Condition[]> {
    return this.http.get<Condition[]>(this.baseUrl, { headers: this.headers });
  }

  // ✅ Récupérer les conditions liées à un challenge
  getConditionsByChallenge(challengeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/byChallenge/${challengeId}`, { headers: this.headers });
  }

  // ✅ Supprimer une condition
  deleteCondition(conditionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${conditionId}`, { headers: this.headers });
  }

  // ✅ Mettre à jour une condition
  updateCondition(conditionId: number, condition: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${conditionId}`, condition, { headers: this.headers });
  }
}