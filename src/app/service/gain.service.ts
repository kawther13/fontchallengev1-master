import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GainService {
 private apiUrl = 'http://localhost:8088/api/gains';
 
    constructor(private http: HttpClient) {}

  /**
   * Récupère tous les agents gagnants pour un challenge donné
   * @param challengeId ID du challenge
   */
  getByChallenge(challengeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/challenge/${challengeId}`);
  }


 getGainsAgents(challengeName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/agents/${challengeName}`);
  }

  getGainsSalaries(challengeName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/salaries/${challengeName}`);
  }

  getGainsChefsAgence(challengeName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chefs-agence/${challengeName}`);
  }

  getGainsChefsRegion(challengeName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chefs-region/${challengeName}`);
  }


 
}
