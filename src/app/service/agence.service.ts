import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agence } from '../models/agence';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {
private baseUrl = 'http://localhost:8088/agences';

  constructor(private http: HttpClient) { }

  getAllAgences(): Observable<Agence[]> {
    return this.http.get<Agence[]>(this.baseUrl);
  }

  getAgenceById(id: number): Observable<Agence> {
    return this.http.get<Agence>(`${this.baseUrl}/${id}`);
  }

 createAgence(regionId: number, agence: any) {
  return this.http.post<Agence>(`${this.baseUrl}/${regionId}`, agence);
}

updateAgence(id: number, regionId: number, agence: any) {
  return this.http.put<Agence>(`${this.baseUrl}/${id}/${regionId}`, agence);
}


  deleteAgence(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}