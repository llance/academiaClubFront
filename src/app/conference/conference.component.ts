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
  private Conferences;
  selectedEvent;
  private specialityFilter;
  GeoFilter;

  continentIndex;
  CountryIndex;
  RegionIndex;
  CityIndex;

  public continentSelected = false;
  public countrySelected = false;
  public regionSelected = false;

  private _this = this;  // capture this

  constructor(private _conferenceApiService: ConferenceApiService) {
  }

  ngOnInit() {
    console.log("called!");
    // (<any>$('.selectpicker')).selectpicker('render');

    this.queryFilters();

    this.sleep(500).then(() => {
      (<any>$('.selectpicker')).selectpicker('render');
    })

    this._conferenceApiService.getConference()
    .subscribe(
      Conferences => this.Conferences = Conferences,
      error => console.log('Error fetching conferences'));
  }


  ngAfterViewInit() {

    var __this = this._this;
    // console.log("(<any>$('.selectpicker')) after view init is : ", (<any>$('.selectpicker')));
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

    // console.log("selected end date : ", enddate);

    this._conferenceApiService.filterByDate(startdate, enddate)
    .subscribe(
      Conferences => this.Conferences = Conferences,
      error => console.log('Error fetching date filter conferences'));
  }
  
  queryFilters() {
    this._conferenceApiService.getSpecialitesFilter()
    .subscribe(
      specialityFilter => this.specialityFilter = specialityFilter,
      error => console.log('Error fetching Specialites Filter'));

    //this.options[0].value = this.specialityFilter.results[0].specialty_text;
    // console.log("this.specialityFilter.results[0].specialty_text", this.specialityFilter.results[0].specialty_text);

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
      Conferences => this.Conferences = Conferences,
      error => console.log('Error fetching specialty filter conferences'));
    
  }



  filterByContinent(event: number) {
    // console.log("event is :", event);
    this.continentIndex = event;
    this.continentSelected = true;
    // console.log("GeoFilter is :", this.GeoFilter);
    console.log("GeoFilter.results[continentIndex] is :", this.GeoFilter.results[event].continent);
    (<any>$('.countrypicker')).selectpicker('render');
  }


  filterByCountry(event:number){
    (<any>$('.selectpicker')).selectpicker('render');
    this.CountryIndex = event;
    this.countrySelected = true;
  }

  filterByRegion(event:number){
    (<any>$('.selectpicker')).selectpicker('render');

    this.RegionIndex = event;
    this.regionSelected = true;
  }

  filterByCity(event:number){
    (<any>$('.selectpicker')).selectpicker('render');

    this.CityIndex = event;
    //console.log("this.GeoFilter.results[this.continentIndex].countries[this.CountryIndex].regions[this.RegionIndex].cities[this.CityIndex] is : ", this.GeoFilter.results[this.continentIndex].countries[this.CountryIndex].regions[this.RegionIndex].cities[this.CityIndex]);
    this._conferenceApiService.filterByCity( this.GeoFilter.results[this.continentIndex].countries[this.CountryIndex].regions[this.RegionIndex].cities[this.CityIndex].city)
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



  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }



  loadjscssfile(filename : string, filetype: string){
    console.log("loading file");
    if (filetype=="js"){ //if filename is a external JavaScript file
      var fileref_js=document.createElement('script')
      fileref_js.setAttribute("type","text/javascript")
      fileref_js.setAttribute("src", filename)
      document.getElementsByTagName("head")[0].appendChild(fileref_js)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
      var fileref_css=document.createElement("link")
      fileref_css.setAttribute("rel", "stylesheet")
      fileref_css.setAttribute("type", "text/css")
      fileref_css.setAttribute("href", filename)
      document.getElementsByTagName("head")[0].appendChild(fileref_css)
    }
  }



}
