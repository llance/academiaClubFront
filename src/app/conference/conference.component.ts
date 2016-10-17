import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConferenceApiService, Conferences, ConferenceEvent } from '../conference-api.service';


@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css',
  ]
})
export class ConferenceComponent implements OnInit, AfterViewInit {
  Conferences;
  selectedEvent: ConferenceEvent;
  SpecialityFilter;
  GeoFilter;


  ContinentIndex;
  CountryIndex;
  RegionIndex;
  CityIndex;


  public continentSelected = false;
  public countrySelected = false;
  public regionSelected = false;



  constructor(private _conferenceApiService: ConferenceApiService) {}

  ngOnInit() {
    this.queryFilters();
    this._conferenceApiService.getConference()
    .subscribe(
      Conferences => this.Conferences = Conferences,
      error => console.log('Error fetching conferences'));
  }


  ngAfterViewInit() {
    (<any>$("#e1")).daterangepicker({
      // presetRanges: [{
      //   text: 'Today',
      //   dateStart: function() { return moment() },
      //   dateEnd: function() { return moment() }
      // }, {
      //   text: 'Tomorrow',
      //   dateStart: function() { return moment().add('days', 1) },
      //   dateEnd: function() { return moment().add('days', 1) }
      // }, {
      //   text: 'Next 7 Days',
      //   dateStart: function() { return moment() },
      //   dateEnd: function() { return moment().add('days', 6) }
      // }, {
      //   text: 'Next Week',
      //   dateStart: function() { return moment().add('weeks', 1).startOf('week') },
      //   dateEnd: function() { return moment().add('weeks', 1).endOf('week') }
      // }],
      applyOnMenuSelect: false,
      datepickerOptions: {
        minDate: null,
        maxDate: null
      },
      altFormat: 'yy-mm-dd',
      dateFormat: 'mm dd, yy' 
    });

  }

  dateFilter(){
    var seletectedRange = JSON.stringify((<any>$("#e1")).daterangepicker("getRange"));

    console.log("selected date range : ", seletectedRange);

    var startdate = seletectedRange.substring(10, 20);

    var enddate = seletectedRange.substring(seletectedRange.indexOf("end")+6, seletectedRange.indexOf("end")+16);

    // console.log("selected end date : ", enddate);

    this._conferenceApiService.filterByDate(startdate, enddate)
    .subscribe(
      Conferences => this.Conferences = Conferences,
      error => console.log('Error fetching date filter conferences'));

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



  filterByContinent(event: number) {
    console.log("event is :", event);
    this.ContinentIndex = event;
    this.continentSelected = true;
        // console.log("GeoFilter is :", this.GeoFilter);
        console.log("GeoFilter.results[ContinentIndex] is :", this.GeoFilter.results[event].continent);
    // console.log("event is :", event);
    // console.log("fetching events matching specialty filter");
    // this._conferenceApiService.filterByContinent( this.GeoFilter.results[event].continent)
    // .subscribe( 
    //   Conferences => this.Conferences = Conferences,
    //   error => console.log('Error fetching region filter conferences'));
  }


  filterByCountry(event:number){
    this.CountryIndex = event;
    this.countrySelected = true;
  }

  filterByRegion(event:number){
    this.RegionIndex = event;
    this.regionSelected = true;
  }

  filterByCity(event:number){
    this.CityIndex = event;
    //console.log("this.GeoFilter.results[this.ContinentIndex].countries[this.CountryIndex].regions[this.RegionIndex].cities[this.CityIndex] is : ", this.GeoFilter.results[this.ContinentIndex].countries[this.CountryIndex].regions[this.RegionIndex].cities[this.CityIndex]);
    this._conferenceApiService.filterByCity( this.GeoFilter.results[this.ContinentIndex].countries[this.CountryIndex].regions[this.RegionIndex].cities[this.CityIndex].city)
    .subscribe( 
      Conferences => this.Conferences = Conferences,
      error => console.log('Error fetching region filter conferences'));
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
