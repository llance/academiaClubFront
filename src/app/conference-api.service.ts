import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ConferenceApiService {
    baseUrl: string;

    constructor(private http: Http) {
        this.baseUrl = 'http://localhost:8000/';
    }

    getConference(): Observable<Conferences> {
        console.log("getting conference events from backend...");
        return this.http.get(`${this.baseUrl}opportunites/api/evenement/`)
        .map(response => response.json());
    }

    getConferenceEventByID(id: number): Observable<ConferenceEvent> {
        console.log('id is : ', id);
        return this.http.get(`${this.baseUrl}opportunites/api/evenement/${id}`)
        .map(response => response.json());
    }

    searchConference(search_input: string): Observable<ConferenceEvent> {
        console.log('search_input is : ', search_input);
        return this.http.get(`${this.baseUrl}opportunites/api/evenement/?search=${search_input}`)
        .map(response => response.json());
    }

}

export interface Conferences {  
    count: number,
    next: string,
    previous: string,
    results: Array<ConferenceEvent>
}

//interface for a SINGLE conference Event
export interface ConferenceEvent {
    id: number,
    specialty: string,
    category: string,
    event_text: string,
    event_country: string,
    event_region: string,
    event_city: string,
    future_event:boolean,
    start_date: string, //consider date format later
    end_date: string, //consider date format later
    event_organizer: string,
    event_description: string,
    event_program: string,
    event_cost: string, //consider number maybe
    event_link: string,
    event_abstract: string,
    event_other: string,
    event_image_url: string,
    event_image_source: string,
    event_tag: string
}

