import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ConferenceApiService {
baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:8000/';
  }

  getConference(): Observable<any> {
    console.log("getting conference event from backend...");
    return this.http.get(`${this.baseUrl}opportunites/api/evenement/`)
                    .map(response => response.json());
  }
}

