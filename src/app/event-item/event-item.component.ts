import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ConferenceApiService} from '../conference-api.service';


@Component({
    selector: 'app-event-item',
    templateUrl: './event-item.component.html',
    styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {
    @Input()
    conferenceEvent;
    navigated = false; // true if navigated here


    constructor(
        private conferenceApiService: ConferenceApiService,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.conferenceApiService.getConferenceEventByID(id).subscribe(
                    conferenceEvent => this.conferenceEvent = conferenceEvent,
                    error => console.log('Error fetching conference event with ID {id}'));

            }
            this.navigated = false;
        });
    }
}


