import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeContrat } from '../models/TypeContrat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeContratService {

private apiUrl = 'http://localhost:8088/api/type-contrats'; // Ajustez l'URL selon votre backend

   constructor(private http: HttpClient) {}

  // 🔐 Getter headers JWT
  private get headers() {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ Récupérer tous les types de contrat
  getAll(): Observable<TypeContrat[]> {
    return this.http.get<TypeContrat[]>(this.apiUrl, { headers: this.headers });
  }

  // ✅ Créer un nouveau type de contrat
  create(typeContrat: TypeContrat): Observable<TypeContrat> {
    return this.http.post<TypeContrat>(this.apiUrl, typeContrat, { headers: this.headers });
  }
}
