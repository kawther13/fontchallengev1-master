import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ConditionGain } from '../models/condition-gain';

@Injectable({
  providedIn: 'root'
})
export class ConditionGainService {
  private apiUrl = 'http://localhost:8088/conditionGains';
constructor(private http: HttpClient) {}

  // 🔐 Getter qui ajoute le token JWT dans les headers
  private get headers() {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ Ajouter une ConditionGain à un Challenge
  addConditionGain(challengeId: number, conditionGain: ConditionGain): Observable<ConditionGain> {
    return this.http.post<ConditionGain>(`${this.apiUrl}/${challengeId}`, conditionGain, { headers: this.headers });
  }

  // ✅ Mettre à jour une ConditionGain existante
  updateConditionGain(id: number, conditionGain: ConditionGain): Observable<ConditionGain> {
    return this.http.put<ConditionGain>(`${this.apiUrl}/${id}`, conditionGain, { headers: this.headers });
  }

  // ✅ Supprimer une ConditionGain par ID
  deleteConditionGain(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  // ✅ Récupérer toutes les ConditionGains d'un Challenge
  getByChallenge(challengeId: number): Observable<ConditionGain[]> {
    return this.http.get<ConditionGain[]>(`${this.apiUrl}/byChallenge/${challengeId}`, { headers: this.headers });
  }
}