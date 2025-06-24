import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GagnantService {

  private baseUrl = 'http://localhost:8080/gagnants'; // change si besoin

  constructor(private http: HttpClient) {}

  getGagnantsParRole(role: string, challengeId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/${role}/${challengeId}`);
  }
   updateGains(challengeId: number) {
    return this.http.post(`${this.baseUrl}/update/${challengeId}`, {});
  }
}