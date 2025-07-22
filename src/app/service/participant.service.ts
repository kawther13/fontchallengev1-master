import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Participant } from '../models/participant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

   private apiUrl = 'http://localhost:8088/Participant';

  constructor(private http: HttpClient) {}

  ajouterParticipant(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.apiUrl, participant);
  }



getAllParticipants(): Observable<Participant[]> {
  return this.http.get<Participant[]>(this.apiUrl);
}


 getParticipantById(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
}

updateParticipant(id: number, participant: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, participant);
}

deleteParticipant(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}    