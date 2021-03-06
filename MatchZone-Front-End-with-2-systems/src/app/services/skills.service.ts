import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Skills } from "../model/skills";
import { TokenStorage } from '../core/token.storage';
const httpOptions = {
  headers: new HttpHeaders({ "Content-type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private upstreamUrl: string = "http://172.23.239.175:8091";
  private downstreamUrl: string = "http://172.23.239.175:8085";
  userId: string;
  constructor(private http: HttpClient, private token: TokenStorage) {
    console.log(token.getUserName());
    this.userId = token.getUserName();
  }
  // Http call for submitting data from form
  postSkills(skills) {
    console.log(skills);
    return this.http.post<Skills>(`${this.upstreamUrl}/api/v1/skills`, skills);

  }
  // Http call for retreiving data from backend
  getSkills() {

    return this.http.get<Skills>(`${this.downstreamUrl}/api/v1/skills/` + this.userId);

  }
  candidateSkills(candidateName) {

    return this.http.get<Skills>(`${this.downstreamUrl}/api/v1/skills/` +candidateName);

  }
}
