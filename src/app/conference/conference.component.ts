import { Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConferenceApiService } from '../conference-api.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: [
  './conference.component.css',
  ],
})
export class ConferenceComponent implements OnInit, AfterViewInit {
  private conferences;
  private selectedEvent;
  private specialityFilter;
  private geoFilter;

  continentIndex;
  countryIndex;
  regionIndex;
  cityIndex;

  public continentSelected = false;
  public countrySelected = false;
  public regionSelected = false;

  private _this = this;  // capture this

  constructor(private _conferenceApiService: ConferenceApiService) {
  }

  ngOnInit() {    
    this.queryFilters();

    this._conferenceApiService.getConference()
    .subscribe(
      conferences => this.conferences = conferences,
      error => console.log('Error fetching conferences'));

    this.sleep(1000).then(() => {
      (<any>$('.selectpicker')).selectpicker('render');
    })
  }


  ngAfterViewInit() {
    var __this = this._this;

    (<any>$("#e1")).daterangepicker({
      applyOnMenuSelect: false,
      datepickerOptions: {
        minDate: null,
        maxDate: null
      },
      altFormat: 'yy-mm-dd',
      dateFormat: 'mm dd, yy',

      change : function(event, data) {
        console.log("event is : ", event);
        console.log("data is : ", data);
        __this.dateFilter();
      },
      cancel: function(event, data) { console.log('cancel clicked') }
    });

  }

  dateFilter(){
    var seletectedRange = JSON.stringify((<any>$("#e1")).daterangepicker("getRange"));

    console.log("selected date range : ", seletectedRange);

    var startdate = seletectedRange.substring(10, 20);
    var enddate = seletectedRange.substring(seletectedRange.indexOf("end")+6, seletectedRange.indexOf("end")+16);

    this._conferenceApiService.filterByDate(startdate, enddate)
    .subscribe(
      conferences => this.conferences = conferences,
      error => console.log('Error fetching date filter conferences'));
  }
  
  queryFilters() {
    this._conferenceApiService.getSpecialitesFilter()
    .subscribe(
      specialityFilter => this.specialityFilter = specialityFilter,
      error => console.log('Error fetching Specialites Filter'));

    this._conferenceApiService.getGeoFilter()
    .subscribe(
      geoFilter => this.geoFilter = geoFilter,
      error => console.log('Error fetching Geo Filter')
      );

    // this._conferenceApiService.getCategoriesFilter()
    // .subscribe(
    //   conferences => this.conferences = conferences,
    //   error => console.log('Error fetching Categories Filter'));
  }

  filterBySpeciality(event:string) {
    var startdate, enddate;

    var seletectedRange = JSON.stringify((<any>$("#e1")).daterangepicker("getRange"));
    console.log("selected date range : ", seletectedRange);

    if (seletectedRange == null){
      console.log("foo");
      startdate = new Date().toJSON().slice(0,10);
      enddate = new Date().toJSON().slice(0,10);
    } else {
      startdate = seletectedRange.substring(10, 20);
      enddate = seletectedRange.substring(seletectedRange.indexOf("end")+6, seletectedRange.indexOf("end")+16);
    }

    console.log("startdate : ", startdate, ", enddate : ", enddate);

    this._conferenceApiService.filterBySpecialty(event, startdate, enddate)
    .subscribe( 
      conferences => this.conferences = conferences,
      error => console.log('Error fetching specialty filter conferences'));
    
  }

  filterByContinent(event: number) {
    // console.log("event is :", event);
    this.continentIndex = event;
    this.continentSelected = true;
    // console.log("geoFilter is :", this.geoFilter);
    console.log("geoFilter.results[continentIndex] is :", this.geoFilter.results[event].continent);
    (<any>$('.countrypicker')).selectpicker('render');
  }

  filterByCountry(event:number){
    (<any>$('.selectpicker')).selectpicker('render');
    this.countryIndex = event;
    this.countrySelected = true;
  }

  filterByRegion(event:number){
    (<any>$('.selectpicker')).selectpicker('render');

    this.regionIndex = event;
    this.regionSelected = true;
  }

  filterByCity(event:number){
    (<any>$('.selectpicker')).selectpicker('render');

    this.cityIndex = event;
    //console.log("this.geoFilter.results[this.continentIndex].countries[this.countryIndex].regions[this.regionIndex].cities[this.cityIndex] is : ", this.geoFilter.results[this.continentIndex].countries[this.countryIndex].regions[this.regionIndex].cities[this.cityIndex]);
    this._conferenceApiService.filterByCity( this.geoFilter.results[this.continentIndex].countries[this.countryIndex].regions[this.regionIndex].cities[this.cityIndex].city)
    .subscribe( 
      conferences => this.conferences = conferences,
      error => console.log('Error fetching region filter conferences'));
  }

  searchEvent(search_input : string) {
    if (search_input) {
      this._conferenceApiService.searchConference(search_input)
      .subscribe(
        conferences => this.conferences = conferences,
        error => console.log('Error fetching conferences'));
    }
  }

  sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time));
  }

}
