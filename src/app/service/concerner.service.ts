import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConcernerService {

  private baseUrl = 'http://localhost:8088/concerners';

  constructor(private http: HttpClient) {}

 getAll() {
  const token = localStorage.getItem('jwt');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<any[]>(`${this.baseUrl}`, { headers });
}
}
