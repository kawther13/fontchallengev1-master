import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { PalierClassement } from '../models/palier-classement';

@Injectable({
  providedIn: 'root'
})
export class PalierClassementService {

 private baseUrl = 'http://localhost:8088/palierClassements';

  constructor(private http: HttpClient) {}

  add(rolePalierId: number, data: PalierClassement): Observable<PalierClassement> {
    return this.http.post<PalierClassement>(`${this.baseUrl}/${rolePalierId}`, data);
  }

  getByRolePalier(rolePalierId: number): Observable<PalierClassement[]> {
    return this.http.get<PalierClassement[]>(`${this.baseUrl}/byRolePalier/${rolePalierId}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}