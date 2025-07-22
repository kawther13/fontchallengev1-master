import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private baseUrl = 'http://localhost:8088/regions';

  constructor(private http: HttpClient) { }

  getAllRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.baseUrl);
  }
 getRegions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl }`);
  }
  getRegionById(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.baseUrl}/${id}`);
  }

  createRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.baseUrl, region);
  }

  updateRegion(id: number, region: Region): Observable<Region> {
    return this.http.put<Region>(`${this.baseUrl}/${id}`, region);
  }

  deleteRegion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}