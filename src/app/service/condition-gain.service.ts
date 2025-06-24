import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ConditionGain } from '../models/condition-gain';

@Injectable({
  providedIn: 'root'
})
export class ConditionGainService {

private apiUrl = 'http://localhost:8088/conditionGains';

  constructor(private http: HttpClient) {}

  // ✅ Ajouter une ConditionGain à un Challenge
  addConditionGain(challengeId: number, conditionGain: ConditionGain): Observable<ConditionGain> {
    return this.http.post<ConditionGain>(`${this.apiUrl}/${challengeId}`, conditionGain);
  }

  // ✅ Mettre à jour une ConditionGain existante
  updateConditionGain(id: number, conditionGain: ConditionGain): Observable<ConditionGain> {
    return this.http.put<ConditionGain>(`${this.apiUrl}/${id}`, conditionGain);
  }

  // ✅ Supprimer une ConditionGain par ID
  deleteConditionGain(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Récupérer toutes les ConditionGains d'un Challenge
  getByChallenge(challengeId: number): Observable<ConditionGain[]> {
    return this.http.get<ConditionGain[]>(`${this.apiUrl}/byChallenge/${challengeId}`);
  }

}