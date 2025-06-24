import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PalierCommission } from '../models/palier-commission';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {

 private baseUrl = 'http://localhost:8088/commissions';

  constructor(private http: HttpClient) {}

  add(rolePalierId: number, commission: PalierCommission): Observable<PalierCommission> {
    return this.http.post< PalierCommission>(`${this.baseUrl}/${rolePalierId}`, commission);
  }

  getByRolePalier(rolePalierId: number): Observable< PalierCommission[]> {
    return this.http.get< PalierCommission[]>(`${this.baseUrl}/byRolePalier/${rolePalierId}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
