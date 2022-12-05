import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  endpoint = 'api/v1/resource/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  emit(message: { text: string; }) {
    let body = {
      message: message
    }
    return this.http.post<any>(`${this.endpoint}message`, body);
  }
  
  getMessages() {
    return this.http.get<any>(`${this.endpoint}getMessages`);
  }
}
