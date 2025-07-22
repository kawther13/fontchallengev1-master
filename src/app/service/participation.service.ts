import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

 private baseUrl = 'http://localhost:8088/participations';

  constructor(private http: HttpClient) {}

  getAgents(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/agents/${name}`);
  }

  getCommercants(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/commercants/${name}`);
  }

  getParRegion(name: string): Observable<{ [key: string]: any[] }> {
    return this.http.get<{ [key: string]: any[] }>(`${this.baseUrl}/regions/${name}`);
  }
}
