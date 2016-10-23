/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CourseApiService } from './course-api.service';

describe('Service: CourseApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseApiService]
    });
  });

  it('should ...', inject([CourseApiService], (service: CourseApiService) => {
    expect(service).toBeTruthy();
  }));
});
