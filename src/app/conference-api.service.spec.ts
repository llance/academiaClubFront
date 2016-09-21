/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConferenceApiService } from './conference-api.service';

describe('Service: ConferenceApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConferenceApiService]
    });
  });

  it('should ...', inject([ConferenceApiService], (service: ConferenceApiService) => {
    expect(service).toBeTruthy();
  }));
});
