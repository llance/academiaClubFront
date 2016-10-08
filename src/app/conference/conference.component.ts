import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConferenceApiService, Conferences, ConferenceEvent } from '../conference-api.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css',
  '../assets/css/bootstrap.css',
  '../assets/css/style.css',
  '../assets/css/colors.css',
  '../assets/css/dark.css',
  '../assets/css/font-icons.css',
  '../assets/css/animate.css',
  '../assets/css/magnific-popup.css',
  '../assets/css/responsive.css',
  '../assets/css/medicalanimation.css',
  '../assets/css/swiper.css',
  '../assets/css/components/bs-select.css',
  '../assets/css/google-css.css']
})
export class ConferenceComponent implements OnInit {
  Conferences;
  selectedEvent: ConferenceEvent;

  constructor(private _conferenceApiService: ConferenceApiService) {}

  ngOnInit() {
    this._conferenceApiService.getConference()
    .subscribe(
      Conferences => this.Conferences = Conferences,
      error => console.log('Error fetching conferences'));
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
