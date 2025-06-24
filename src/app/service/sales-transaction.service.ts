import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalesTransaction } from '../models/sales-transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesTransactionService {
private apiUrl = 'http://localhost:8088/api/sales-transactions';

  constructor(private http: HttpClient) {}

  /** Obtenir toutes les transactions */
  getAll(): Observable<SalesTransaction[]> {
    return this.http.get<SalesTransaction[]>(this.apiUrl);
  }

  /** Obtenir une transaction par ID */
  getById(id: number): Observable<SalesTransaction> {
    return this.http.get<SalesTransaction>(`${this.apiUrl}/${id}`);
  }

  /** Ajouter une nouvelle transaction */
  addTransaction(transaction: SalesTransaction): Observable<SalesTransaction> {
    return this.http.post<SalesTransaction>(this.apiUrl, transaction);
  }

  /** Mettre à jour une transaction */
  updateTransaction(id: number, transaction: SalesTransaction): Observable<SalesTransaction> {
    return this.http.put<SalesTransaction>(`${this.apiUrl}/${id}`, transaction);
  }

  /** Supprimer une transaction */
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByChallengeId(challengeId: number): Observable<SalesTransaction[]> {
  return this.http.get<SalesTransaction[]>(`${this.apiUrl}/challenge/${challengeId}`);
}

}