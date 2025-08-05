import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeScore } from '../models/TypeScore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeScoreService {

 private apiUrl = 'http://localhost:8088/api/type-scores';

  constructor(private http: HttpClient) {}

  // 🔐 Getter pour ajouter le token JWT
  private get headers() {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ Récupérer tous les types de scores
  getAll(): Observable<TypeScore[]> {
    return this.http.get<TypeScore[]>(this.apiUrl, { headers: this.headers });
  }
}

