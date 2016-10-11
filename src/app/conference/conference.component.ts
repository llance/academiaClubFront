import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConferenceApiService, Conferences, ConferenceEvent } from '../conference-api.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  // styles: [
  //   require('../assets/css/google-css.css'),
  //   require('../assets/css/bootstrap.css'),
  //   require('../assets/css/style.css'),
  //   require('../assets/css/colors.css'),
  //   require('../assets/css/dark.css'),
  //   require('../assets/css/font-icons.css'),
  //   require( '../assets/css/animate.css'),
  //   require('../assets/css/magnific-popup.css'),
  //   require('../assets/css/responsive.css'),
  //   require( '../assets/css/medicalanimation.css'),
  //   // require('./assets/js/jquery.js'),
  //   // require('./assets/js/plugins.js'),
  //   // require('./assets/js/functions.js') 
  //   ],
  // styleUrls: ['./conference.component.css',
  // // '../assets/css/style.css',
  // '../assets/css/swiper.css',
  // '../assets/css/components/bs-select.css',
  // '../assets/css/imports/portfolio.css'
  // ]
})
export class ConferenceComponent implements OnInit {
  Conferences;
  selectedEvent: ConferenceEvent;
  SpecialityFilter;


  constructor(private _conferenceApiService: ConferenceApiService) {}

  ngOnInit() {
    this._conferenceApiService.getConference()
    .subscribe(
      Conferences => this.Conferences = Conferences,
      error => console.log('Error fetching conferences'));

    this.queryFilters();

  }


  queryFilters() {
    this._conferenceApiService.getSpecialitesFilter()
    .subscribe(
      SpecialityFilter => this.SpecialityFilter = SpecialityFilter,
      error => console.log('Error fetching Specialites Filter'));

    // this._conferenceApiService.getGeoFilter()
    // .subscribe(
    //   Conferences => this.Conferences = Conferences,
    //   error => console.log('Error fetching Geo Filter'));

    // this._conferenceApiService.getCategoriesFilter()
    // .subscribe(
    //   Conferences => this.Conferences = Conferences,
    //   error => console.log('Error fetching Categories Filter'));
  }

  onSelect(selectedEvent: ConferenceEvent): void {
    this.selectedEvent = selectedEvent;
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
