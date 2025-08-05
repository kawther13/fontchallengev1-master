import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ScoreRule } from '../models/score-rule';

@Injectable({
  providedIn: 'root'
})
export class ScoreRule1Service {
 private baseUrl = 'http://localhost:8088/scoreRules';

  constructor(private http: HttpClient) {}

  // 🔐 Header avec token JWT
  private get headers() {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  /**
   * Créer une nouvelle ScoreRule
   */
  create(scoreRule: any, challengeId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${challengeId}`, scoreRule, { headers: this.headers });
  }

  /**
   * Mettre à jour une ScoreRule existante
   */
  update(id: any, data: any): Observable<ScoreRule> {
    return this.http.put<ScoreRule>(`${this.baseUrl}/${id}`, data, { headers: this.headers });
  }

  /**
   * Récupérer une ScoreRule par son ID
   */
  getById(id: number): Observable<ScoreRule> {
    return this.http.get<ScoreRule>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  /**
   * Lister toutes les ScoreRules
   */
  getAll(): Observable<ScoreRule[]> {
    return this.http.get<ScoreRule[]>(this.baseUrl, { headers: this.headers });
  }

  /**
   * Supprimer une ScoreRule par son ID
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  /**
   * Lister les ScoreRules par challenge
   */
  getAllByChallenge(challengeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/byChallenge/${challengeId}`, { headers: this.headers });
  }
}