import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

 private apiUrl = 'http://localhost:8088/api/notifications';

  constructor(private http: HttpClient) {}

  sendNotification(challengeId: number, titre: string, message: string): Observable<void> {
    const params = { challengeId: challengeId.toString(), titre, message };
    return this.http.post<void>(`${this.apiUrl}/send`, null, { params });
  }

  respondToNotification(notificationId: number, reponse: string): Observable<void> {
    const params = { notificationId: notificationId.toString(), reponse };
    return this.http.post<void>(`${this.apiUrl}/respond`, null, { params });
  }
}