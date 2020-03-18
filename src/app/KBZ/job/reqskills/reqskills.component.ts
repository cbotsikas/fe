import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray  } from '@angular/forms';

import { langs } from '../../langs';

@Component({
    moduleId: module.id,
    selector: 'app-reqskills',
    templateUrl: './reqskills.component.html',
    styleUrls: ['./reqskills.component.scss']
})


export class ReqskillsComponent {

    @Input() parentform: FormGroup;
    @Input() group: FormArray;
    public skillsform: FormGroup;

    langs = langs;

    constructor(private formBuilder: FormBuilder) {
    }


}

