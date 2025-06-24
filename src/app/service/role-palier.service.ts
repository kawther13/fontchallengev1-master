import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { RolePaliers } from '../models/role-paliers';

@Injectable({
  providedIn: 'root'
})
export class RolePalierService {

 private baseUrl = 'http://localhost:8088/rolePaliers';

  constructor(private http: HttpClient) {}

  addRolePalier(challengeId: number, data: RolePaliers): Observable<RolePaliers> {
    return this.http.post<RolePaliers>(`${this.baseUrl}/${challengeId}`, data);
  }

  getByChallenge(challengeId: number): Observable<RolePaliers[]> {
    return this.http.get<RolePaliers[]>(`${this.baseUrl}/byChallenge/${challengeId}`);
  }

  deleteRolePalier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Optionnel : pour la méthode saveDetails groupée
  saveDetails(rolePalierId: number, body: any): Observable<RolePaliers> {
    return this.http.post<RolePaliers>(`${this.baseUrl}/${rolePalierId}/saveDetails`, body);
  }
}