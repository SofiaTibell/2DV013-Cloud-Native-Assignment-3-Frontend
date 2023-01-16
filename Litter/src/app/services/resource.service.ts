import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  endpoint = 'litter/api/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  send(message: string ) {
    const body = {
      "message": message
    }
    return this.http.post<any>(`${this.endpoint}Lit?message=${encodeURIComponent(message)}`, body);
  }

  getFollowings(userId: string) {
    return this.http.get<any>(`${this.endpoint}Followings/${userId}`);
  }

  getLits(userId: string) {
    return this.http.get<any>(`${this.endpoint}Lits/${userId}`);
  }

  getSubscribeLits() {
    return this.http.get<any>(`${this.endpoint}Lits`);
  }

  follow(userIdToFollow:string) {
    return this.http.post<any>(`${this.endpoint}Follow/${userIdToFollow}`, '');
  }

  unfollow(userIdToFollow:string) {
    return this.http.delete<any>(`${this.endpoint}Follow/${userIdToFollow}`);
  }
}
