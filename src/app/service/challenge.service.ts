import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChallengeDetail } from '../models/challenge-detail';



export interface Challenge {
  rules: any;
  id?: number;
  nom: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  concerner: string[];
}
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
 getAll(): Observable<Challenge[]> {
  return this.http.get<Challenge[]>(this.baseUrl);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getById(id: number) {
  return this.http.get<ChallengeDetail>(`http://localhost:8088/challenges/${id}`);
}

}
