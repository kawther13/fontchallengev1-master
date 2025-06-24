import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pack } from '../models/pack';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackService {

  private baseUrl = 'http://localhost:8088/packs';

  constructor(private http: HttpClient) {}

  getAllPacks(): Observable<Pack[]> {
    return this.http.get<Pack[]>(`${this.baseUrl}/all`);
  }
}