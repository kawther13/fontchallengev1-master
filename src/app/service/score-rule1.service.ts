import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ScoreRule } from '../models/score-rule';

@Injectable({
  providedIn: 'root'
})
export class ScoreRule1Service {

   private baseUrl = 'http://localhost:8088/scoreRules';

  constructor(private http: HttpClient) {}

  /**
   * Créer une nouvelle ScoreRule
   */
 create(scoreRule: any, challengeId: number) {
  return this.http.post(`http://localhost:8088/scoreRules/${challengeId}`, scoreRule);
}


  /**
   * Mettre à jour une ScoreRule existante
   */
  update(id: any , data: ScoreRule): Observable<ScoreRule> {
    return this.http.put<ScoreRule>(`${this.baseUrl}/${id}`, data);
  }

  /**
   * Récupérer une ScoreRule par son ID
   */
  getById(id: number): Observable<ScoreRule> {
    return this.http.get<ScoreRule>(`${this.baseUrl}/${id}`);
  }

  /**
   * Lister toutes les ScoreRules
   */
  getAll(): Observable<ScoreRule[]> {
    return this.http.get<ScoreRule[]>(this.baseUrl);
  }

  /**
   * Supprimer une ScoreRule par son ID
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

getAllByChallenge(challengeId: number) {
  return this.http.get<any[]>(`http://localhost:8088/scoreRules/byChallenge/${challengeId}`);
}
}