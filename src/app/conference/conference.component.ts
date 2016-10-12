import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConferenceApiService, Conferences, ConferenceEvent } from '../conference-api.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css',
  ]
})
export class ConferenceComponent implements OnInit {
  Conferences;
  selectedEvent: ConferenceEvent;
  SpecialityFilter;
  GeoFilter;


  constructor(private _conferenceApiService: ConferenceApiService) {}

  ngOnInit() {
    this.queryFilters();
    this._conferenceApiService.getConference()
    .subscribe(
      Conferences => this.Conferences = Conferences,
      error => console.log('Error fetching conferences'));
  }


  queryFilters() {
    this._conferenceApiService.getSpecialitesFilter()
    .subscribe(
      SpecialityFilter => this.SpecialityFilter = SpecialityFilter,
      error => console.log('Error fetching Specialites Filter'));

    this._conferenceApiService.getGeoFilter()
    .subscribe(
      GeoFilter => this.GeoFilter = GeoFilter,
      error => console.log('Error fetching Geo Filter')
      );


    // this._conferenceApiService.getCategoriesFilter()
    // .subscribe(
    //   Conferences => this.Conferences = Conferences,
    //   error => console.log('Error fetching Categories Filter'));
  }

  filterBySpeciality(event:string) {
    // console.log("event is :", event);
    // console.log("fetching events matching specialty filter");
    this._conferenceApiService.filterBySpecialty(event)
    .subscribe( 
      Conferences => this.Conferences = Conferences,
      error => console.log('Error fetching specialty filter conferences'));
    
  }

  process(key,value) {
    if (key == "country"){
      console.log(key + " : "+value);

      // var opt = document.createElement("option");
      // opt.value= value;

      // @ViewChild('countrySelector') countrySelector;
      // this.countrySelection.appendChild(opt);
    }
  }

  traverse(o,func) {
    for (var i in o) {
      func.apply(this,[i,o[i]]);  
      if (o[i] !== null && typeof(o[i])=="object") {
            //going on step down in the object tree!!
            this.traverse(o[i],func);
          }
        }
      }


  filterByContinent(event:string) {
    //this.traverse(this.GeoFilter, this.process)

    // console.log("event is :", event);
    // console.log("fetching events matching specialty filter");
    this._conferenceApiService.filterByContinent(event)
    .subscribe( 
      Conferences => this.Conferences = Conferences,
      error => console.log('Error fetching region filter conferences'));
  }

  filterByCountry(event:string){

  }

  searchEvent(search_input : string) {
    if (search_input) {
      this._conferenceApiService.searchConference(search_input)
      .subscribe(
        Conferences => this.Conferences = Conferences,
        error => console.log('Error fetching conferences'));
    }
  }
}
