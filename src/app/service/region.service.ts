import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private baseUrl = 'http://localhost:8088/regions';

  constructor(private http: HttpClient) {}

  // 🔐 Header avec token JWT
  private get headers() {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ Récupérer toutes les régions
  getAllRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.baseUrl, { headers: this.headers });
  }

  getRegions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.headers });
  }

  // ✅ Récupérer une région par ID
  getRegionById(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  // ✅ Créer une nouvelle région
  createRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.baseUrl, region, { headers: this.headers });
  }

  // ✅ Mettre à jour une région
  updateRegion(id: number, region: Region): Observable<Region> {
    return this.http.put<Region>(`${this.baseUrl}/${id}`, region, { headers: this.headers });
  }

  // ✅ Supprimer une région
  deleteRegion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.headers,
      responseType: 'text' as 'json'
    });
  }
}