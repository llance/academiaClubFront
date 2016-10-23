import { Component, OnInit } from '@angular/core';
import { CourseApiService} from '../course-api.service';


@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
    Courses;


    constructor(private _courseApiService: CourseApiService) {
    }

    ngOnInit() {
        this._courseApiService.getCourse()
        .subscribe(
            Courses => this.Courses = Courses,
            error => console.log('Error fetching Courses'));
    }

}

