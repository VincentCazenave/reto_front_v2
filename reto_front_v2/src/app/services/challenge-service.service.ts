import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ChallengeServiceService {

  base_url= "http://192.168.1.62:8080";

  constructor(
    private http: HttpClient
  ) { }

  getChallenge(category: string): Observable<any> {
    return this.http.get(this.base_url+"/challenge?category="+category); 
  }

  getChallengeRandom(): Observable<any>{
    return this.http.get(this.base_url+"/challenge/random");
  }

}
