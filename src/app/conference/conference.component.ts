import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConferenceApiService } from '../conference-api.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {
    items;

  constructor(private _conferenceApiService: ConferenceApiService) {}

  ngOnInit() {
    console.log("this._conferenceApiService.getConference() is :" + this._conferenceApiService.getConference());
    this._conferenceApiService.getConference()
                    .subscribe(
                      items => this.items = items,
                      error => console.log('Error fetching conferences'));
  }

}

