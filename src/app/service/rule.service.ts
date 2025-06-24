import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RuleService {

   private baseUrl = 'http://localhost:8088/rules'; // adapte au besoin

  constructor(private http: HttpClient) {}

  // ➕ Ajouter une seule règle
  addRule(challengeId: number, rule: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save/${challengeId}`, rule);
  }

  // 🔄 Modifier une règle existante
  updateRule(id: number, rule: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, rule);
  }

  // ❌ Supprimer une règle par son ID
  deleteRule(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // 🔍 Récupérer toutes les règles d’un challenge
  getRulesByChallenge(challengeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rule_challenge/${challengeId}`);
  }

  
}
