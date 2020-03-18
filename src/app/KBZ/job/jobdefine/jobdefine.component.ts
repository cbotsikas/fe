import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

// import { Observable, of } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http';
// import { JobpostService } from './../../../services/jobpost/jobpost.service';
// import { Jobpost } from '../jobpost';


@Component({
  selector: 'app-jobdefine',
  templateUrl: './jobdefine.component.html',
  styleUrls: ['./jobdefine.component.scss']
})

export class JobdefineComponent implements OnInit {

  @Input() parentform: FormGroup;

  constructor() { }

  ngOnInit() {
    /*
    this.jobpostService.get()
    .subscribe((response: any[]) => {
      console.log(response );
      this.skills = response ;
    });
    */

  // this.loadAllArticles();
  // this.saveJob();
  }


  loadAllArticles() {
     // this.allJobposts$ = this.jobpostService.getAlljobs();
  }
/*
  get Label() {
     return this.jobpostForm.get('Label');
  }
  get category() {
     return this.jobpostForm.get('department');
  }
  get writer() {
     return this.jobpostForm.get('level');
  }
  get JobDescription() {
    return this.jobpostForm.get('JobDescription');
 }
*/
/*
  saveJob() {
     const job = {
       id: '2',
       Label: 'Java developer',
       department: 'product',
       level: 'senior',
       JobDescription: 'description'
      };

      this.jobpostService.postJob(job).subscribe(res => {
          // const artcl: Jobpost = res.body;
          // console.log(artcl.title);
          // console.log(res.headers.get('Content-Type'));
          // this.loadAllArticles();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred.
            console.log('An error occurred:', err.error.message);
          } else {
            // Backend returns unsuccessful response codes such as 404, 500 etc.
            console.log('Backend returned status code: ', err.status);
            console.log('Response body:', err.error);
          }
        }
     );
  }
  */
}
