import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { Observable, of } from 'rxjs';

import { Form, FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { JobpostService } from './../../services/jobpost/jobpost.service';
import { Jobpost } from './jobpost';


@Component({
    selector: 'app-job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.scss'],
    animations: [routerTransition()]
})
export class JobComponent implements OnInit {

    allJobposts$: Observable<Jobpost[]>;

    jobs;

    dataSaved = false;

    jobpostForm: FormGroup;
    control: FormArray;

    constructor(private formBuilder: FormBuilder, private jobpostService: JobpostService) {}

    ngOnInit() {

        this.jobpostForm = this.formBuilder.group({
            Label: ['', Validators.required, Validators.minLength(3)],
            department: ['', [Validators.required, Validators.email]],
            level: ['', Validators.required],
            employmentType: ['', Validators.required],
            JobDescription: '',
            SkillReq: this.formBuilder.array([ this.initSkill() ])
          });

        /*
        this.jobpostForm = new FormGroup({
            Label: new FormControl('', [Validators.required, Validators.minLength(3)]),
            department: new FormControl('', [Validators.required, Validators.email]),
            level: new FormControl('', Validators.required),
            JobDescription: new FormControl('', [])
          });
        */
        // this.jobpostForm.valueChanges.subscribe(newVal => console.log(newVal));

    }

    initSkill(): FormGroup {
        return this.formBuilder.group({
            SkillLabel: '',
            proficiencyLevel: '',
          // skillPriority: ['']
        });
    }

    addSkill() {
        // add skill to the skills list
        this.control = <FormArray>this.jobpostForm.controls['SkillReq'];
        this.control.push(this.initSkill());
    }

    removeSkill(i: number) {
        // remove address from the list
        this.control = <FormArray>this.jobpostForm.controls['SkillReq'];
        this.control.removeAt(i);
    }

    onFormSubmit() {
        this.dataSaved = false;
        const job = this.jobpostForm.value;
        // this.jobpostService.getAlljobs().subscribe(jobs => {
          // let maxIndex = jobs.length - 1;
          // let maxIndexItem = jobs[maxIndex];
          // job.id = parseInt(maxIndexItem.id) + 1;
          // this.createJob(job);
        // });
        console.log(job);
        console.log('++++++++++++++++++++++++');
        this.createJob(job);
        this.jobpostForm.reset();
    }

    createJob(job: Jobpost) {
        this.jobpostService.postJob(job).subscribe(
          job => {
            console.log(job);
            this.dataSaved = true;
            // this.loadAllArticles();
          },
          err => {
            console.log(err);
          }
        );
      }

}
