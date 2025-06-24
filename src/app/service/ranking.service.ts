import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

 private baseUrl = 'http://localhost:8088/api/ranking';

  constructor(private http: HttpClient) {}

  getRankingByTypeAndChallenge(type: string, challengeName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${type}/${challengeName}`);
  }
}
