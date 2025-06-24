import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../models/produit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private baseUrl = 'http://localhost:8088/produits';

  constructor(private http: HttpClient) {}

  createProduit(produit: Produit): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, produit);
  }

   getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.baseUrl);
  }

  getAllProduits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }


  getAllPacks() {
  return this.http.get<any[]>('http://localhost:8088/packs/all');
}

getProduitById(id: number) {
  return this.http.get<any>(`http://localhost:8088/produits/${id}`);
}

updateProduit(id: number, data: any) {
  return this.http.put(`http://localhost:8088/produits/update/${id}`, data);
}


}
