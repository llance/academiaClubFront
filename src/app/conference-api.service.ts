import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';
import { environmentIP } from '../environments/ipConstant';


@Injectable()
export class ConferenceApiService {
    baseUrl: string;

    constructor(private http: Http) {
        if (environment.production) {
            this.baseUrl = environmentIP.getProdIP;
        } else {
            this.baseUrl = environmentIP.getDevIP;
        }
        this.baseUrl='https://academiaclub.herokuapp.com/';
    }

    getConference(): Observable<Conferences> {
        console.log("getting conference events from backend...");
        var todayDate = new Date().toJSON().slice(0,10);
        return this.http.get(`${this.baseUrl}opportunites/api/evenement/?&search=&format=json&start_date_0=+${todayDate}&limit=9`)
        .map(response => response.json());
    }

    getCategoriesFilter(): Observable<string> {
        console.log("fetching filter choices for evenement page");
        return this.http.get(`${this.baseUrl}opportunites/api/categories/`)
        .map(response => response.json());
    }

    getGeoFilter(): Observable<string> {
        console.log("fetching filter choices for evenement page");
        return this.http.get(`${this.baseUrl}opportunites/api/geo/`)
        .map(response => response.json());
    }

    getSpecialitesFilter(): Observable<any> {
        console.log("fetching filter choices for evenement page");
        return this.http.get(`${this.baseUrl}opportunites/api/specialites/`)
        .map(response => response.json());
    }

    filterBySpecialty(specialityFilter : string, startdate : string, enddate: string){
        console.log("filterBySpecialty called!", specialityFilter);
        var specialtyUrl = "";
        console.log("specialityFilter.length is :", specialityFilter.length );
        for (let sf of specialityFilter) {
            specialtyUrl = specialtyUrl + "specialty=" + sf + "&";
        }
        console.log("specialtyUrl is :", specialtyUrl);
        return this.http.get(`${this.baseUrl}opportunites/api/evenement/?${specialtyUrl}&start_date_0=+${startdate}&start_date_1=${enddate}`)
        .map(response => response.json());
    }

    filterByCity(city : string){
        console.log("city called!", city);
        return this.http.get(`${this.baseUrl}opportunites/api/evenement/?event_city=${city}`)
        .map(response => response.json());
    }

    filterByDate(startdate : string, enddate: string){
        console.log(" filterByDate called!", startdate, "enddate: ",enddate);
        return this.http.get(`${this.baseUrl}opportunites/api/evenement/?start_date_0=${startdate}&start_date_1=${enddate}`)
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

