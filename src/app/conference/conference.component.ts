import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConferenceApiService } from '../conference-api.service';

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
  '../assets/css/components/bs-select.css']
})
export class ConferenceComponent implements OnInit {
    items;

  constructor(private _conferenceApiService: ConferenceApiService) {}

  ngOnInit() {
    this._conferenceApiService.getConference()
                    .subscribe(
                      items => this.items = items,
                      error => console.log('Error fetching conferences'));
  }
}

