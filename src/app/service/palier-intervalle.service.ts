import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PalierIntervalle } from '../models/palier-intervalle';


@Injectable({
  providedIn: 'root'
})
export class PalierIntervalleService {

 private baseUrl = 'http://localhost:8088/palierIntervalles';

  constructor(private http: HttpClient) {}

  add(rolePalierId: number, data: PalierIntervalle): Observable<PalierIntervalle> {
    return this.http.post<PalierIntervalle>(`${this.baseUrl}/${rolePalierId}`, data);
  }

  getByRolePalier(rolePalierId: number): Observable<PalierIntervalle[]> {
    return this.http.get<PalierIntervalle[]>(`${this.baseUrl}/byRolePalier/${rolePalierId}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}