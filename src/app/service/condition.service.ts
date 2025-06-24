import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Condition } from '../models/condition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  private baseUrl = 'http://localhost:8088/api/conditions';

  constructor(private http: HttpClient) {}

 createCondition(condition: any, challengeId: number) {
  return this.http.post(`http://localhost:8088/api/conditions/${challengeId}`, condition);
}


  getConditions(): Observable<Condition[]> {
    return this.http.get<Condition[]>(this.baseUrl);
  }


   getConditionsByChallenge(challengeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/byChallenge/${challengeId}`);
  }

  deleteCondition(conditionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${conditionId}`);
  }

  updateCondition(conditionId: number, condition: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${conditionId}`, condition);
  }

}
