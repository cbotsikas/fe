import { Component, OnInit} from '@angular/core';
import { routerTransition } from '../../router.animations';

import * as Chart from 'chart.js';
import { MatchingService } from './../../services/matching.service';


// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily =
    '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

@Component({
    selector: 'app-recruitment',
    templateUrl: './recruitment.component.html',
    styleUrls: ['./recruitment.component.scss'],
    animations: [routerTransition()]
})
export class RecruitmentComponent implements OnInit     {
    // recruits = recruits;
    recruits = [];
    title = 'Recruitment';
    canvas: any;
    ctx: any;

    constructor(private matchingService: MatchingService) {}

    ngOnInit() {
        this.getMatchedCVs('Job1');
    }

    getMatchedCVs(jobID) {
        this.matchingService.matchJob(jobID)
        .subscribe(
            CVs => {

                /*
                console.log(CVs);
                 for (const CV of CVs) {
                    console.log(CV);
                 }
                */
                 this.recruits = CVs;
                 this.recruits.sort((a, b) => b.score - a.score);
                 setTimeout( () => this.updateCharts());
                 /*
              this.recruits.push(
                {
                    name: 'Candidate01',
                    role: 'Data Scientist',
                    available: '2019/04/13',
                    expsalary: '32k',
                    score: 70
                }
              );
              */
            },
            err => {
              console.log(err);
            }
          );
    }

    updateCharts() {
        console.log('updateing the Charts...');
        // document.getElementById('#dataTable').DataTable();
        for (let i = 0; i < this.recruits.length; i++) {
            const ctxname = 'Chart' + i;
            // this.ctx = document.getElementById(ctxname);
            const value2 = this.recruits[i].score;
            const value1 = 100 - value2;

            this.canvas = document.getElementById(ctxname);
            this.ctx = this.canvas.getContext('2d');
            // this.ctx.width = '25px';
            // this.ctx.height = '25px';

            const myChart = new Chart(this.ctx, {
                type: 'pie',
                data: {
                    labels: ['Negative', 'Positive'],
                    datasets: [
                        {
                            label: 'Matching Score',
                            data: [value1, value2],
                            backgroundColor: [
                                'rgba(0, 0, 0, 1)',
                                'rgba(30, 144, 255, 1)'
                            ],
                            borderWidth: 1,
                            weight: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                      display: false
                    }
                }
            });
        }
    }

}
