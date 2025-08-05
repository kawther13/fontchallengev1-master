import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../models/produit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

 private baseUrl = 'http://localhost:8088/produits';

  constructor(private http: HttpClient) {}

  // 🔐 Getter pour ajouter le token JWT dans les headers
  private get headers() {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ Créer un produit
  createProduit(produit: Produit): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, produit, { headers: this.headers });
  }

  // ✅ Récupérer tous les produits
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.baseUrl, { headers: this.headers });
  }

  getAllProduits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`, { headers: this.headers });
  }

  // ✅ Supprimer un produit
  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers: this.headers });
  }

  // ✅ Récupérer tous les packs
  getAllPacks(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8088/packs/all', { headers: this.headers });
  }

  // ✅ Récupérer un produit par ID
  getProduitById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  // ✅ Mettre à jour un produit
  updateProduit(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data, { headers: this.headers });
  }
}