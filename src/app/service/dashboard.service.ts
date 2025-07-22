import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8088/api/dashboard';

  constructor(private http: HttpClient) {}

  getStatsByChallengeName(name: string): Observable<any> {
  return this.http.get(`http://localhost:8088/api/dashboard/stats?challengeName=${name}`);
}
getRevenuChefRegionByName(challengeName: string): Observable<{ [region: string]: number }> {
  return this.http.get<{ [region: string]: number }>(
    'http://localhost:8088/api/dashboard/revenu-chef-region',
    { params: { challengeName } }
  );
}

getStatistiquesParChallenge(codePar:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/challenges?codePar=${codePar}`);
  }
 getChallengesEnCours(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/challenge-encours`);
}

getRevenuParChallenge(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/revenu-challenges-encours`);
  }

}
