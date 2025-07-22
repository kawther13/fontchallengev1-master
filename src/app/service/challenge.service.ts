import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChallengeDetail } from '../models/challenge-detail';
import { Challenge } from '../models/challenge';




@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
   private challengeIdSubject = new BehaviorSubject<number | null>(null);
  challengeId$ = this.challengeIdSubject.asObservable();

  private baseUrl = 'http://localhost:8088/challenges';
private Url = 'http://localhost:8088/rules';
  constructor(private http: HttpClient) {}
  

  createChallenge(challenge: any): Observable<Challenge> {
    return this.http.post<Challenge>(`${this.baseUrl}/save`, challenge);
}
  setChallengeId(id: number) {
    this.challengeIdSubject.next(id);
  }

  getChallengeId(): number | null {
    return this.challengeIdSubject.getValue();
  }


    addRules(challengeId: number, rules: any[]): Observable<any> {
    return this.http.post(`${this.Url}/save/${challengeId}`, rules);
  }

  addScoreRules(challengeId: number, scoreRules:any): Observable<any> {
    return this.http.post(`${this.Url}/scoreRules/challenge/${challengeId}`, scoreRules);
  }

   getAllChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.baseUrl);
  }

  deleteChallenge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getChallengeById(id: number): Observable<Challenge> {
    return this.http.get<Challenge>(`${this.baseUrl}/${id}`);
  }

  getAllByChallenge(challengeId: number) {
  return this.http.get<any[]>(`http://localhost:8088/scoreRules/byChallenge/${challengeId}`);
}


/*********************** */

  save(challenge: any) {
    return this.http.post(`${this.baseUrl}`, challenge);
  }
 getChallenges(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}`);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getById(id: number) {
  return this.http.get<ChallengeDetail>(`http://localhost:8088/challenges/${id}`);
}



update(id: number, challenge: Challenge) {
  return this.http.put(`http://localhost:8088/challenges/${id}`, challenge);
}


getAllConcerners(id: number) {
  return this.http.get<any[]>(`http://localhost:8088/challenges/by-challenge/${id}`);
}
}
