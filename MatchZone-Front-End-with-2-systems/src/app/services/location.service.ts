import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Location } from "../model/location";
import { TokenStorage } from '../core/token.storage';
const httpOptions = {
  headers: new HttpHeaders({ "Content-type": "application/json" })
};
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private upstreamUrl: string = "http://172.23.239.175:8091";
  private downstreamUrl: string = "http://172.23.239.175:8085";
  userId: string;
  constructor(private http: HttpClient, private token: TokenStorage) {
    this.userId = token.getUserName();
  }
  // Http call for submitting data from form
  postLocation(location) {
    console.log(location);
    return this.http.post<Location>(`${this.upstreamUrl}/api/v1/loc`, location);

  }
  // Http call for retrieving data from backend
  getLocation() {

    return this.http.get<Location>(`${this.downstreamUrl}/api/v1/loc/` + this.userId);

  }
  candidateLocation(candidateName) {

    return this.http.get<Location>(`${this.downstreamUrl}/api/v1/loc/` +candidateName);

  }
}
