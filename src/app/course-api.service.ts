import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CourseApiService {
    baseUrl: string;

    constructor(private http: Http) {
        this.baseUrl = 'http://localhost:8000/';
    }
    getCourse(): Observable<any> {
        console.log("getting conference events from backend...");
        return this.http.get(`${this.baseUrl}opportunites/api/evenement/`)
        .map(response => response.json());
    }
}
