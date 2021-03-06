import {Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatchingService } from '../../_services/matching.service';
import { ExcelServiceService } from '../../_services/excel/excel-service.service';
import { Job } from '../../_models/Job';
import { JobsService } from '../../_services/jobs.service';
import { UsersService } from '../../_services/users.service';
import User from '../../_models/user';


@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
/*
export class RecruitmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
*/
/*
const ELEMENT_DATA: listOfCandidates[] = [    
  {name: 'Candidate01', role: 'Solutions Architect', available: '2020/01/13', expsalary: '32k', score: 33, id:1},
  {name: 'Candidate02', role: 'Tech Lead/ Software Architect', available: '2020/02/11', expsalary: '32k', score: 44, id:2},
  {name: 'Candidate03', role: 'Senior Software Engineer', available: '2020/05/14', expsalary: '32k', score: 55, id:3},
  {name: 'Candidate04', role: 'Blockchain Engineer', available: '2020/01/03', expsalary: '32k', score: 23, id:4},
  {name: 'Candidate05', role: 'Backend developer', available: '2020/05/21', expsalary: '32k', score: 76, id:5},
  {name: 'Candidate06', role: 'PHP Senior Developer', available: '2020/05/11', expsalary: '32k', score: 52, id:6},
  {name: 'Candidate07', role: 'Data Scientist', available: '2019/04/13', expsalary: '32k', score: 70, id:7}
];
*/

export class RecruitmentComponent implements OnInit {

  jobs: Job[];
  users: User[];
  //recruits = [];
  /*
  listOfCandidates = [    
    {name: 'Candidate01', role: 'Solutions Architect', available: '2020/01/13', expsalary: '31k', score: 33, id:1},
    {name: 'Candidate02', role: 'Tech Lead/ Software Architect', available: '2020/02/11', expsalary: '41k', score: 44, id:2},
    {name: 'Candidate03', role: 'Senior Software Engineer', available: '2020/05/14', expsalary: '23k', score: 55, id:3},
    {name: 'Candidate04', role: 'Blockchain Engineer', available: '2020/01/03', expsalary: '15k', score: 23, id:4},
    {name: 'Candidate05', role: 'Backend developer', available: '2020/05/21', expsalary: '55k', score: 76, id:5},
    {name: 'Candidate06', role: 'PHP Senior Developer', available: '2020/05/11', expsalary: '21k', score: 52, id:6}
  ];
  */
  listOfCandidates = [];

  recruits = this.listOfCandidates;
  canvas: any;
  ctx: any;
  seachJobTextInput: string;

  public chartDataList: Array<number> = [];
  public labelList: Array<any> = [];  
  // labels
  public chartLabels: Array<any> = ['Score', ''];

  public chartOptions: any = {
    responsive: true,
      plugins: {
      datalabels: {
        display: true,
        align: 'top',
        anchor: 'end',
        //color: "#2756B3",
        color: "#222",
        font: {
          family: 'FontAwesome',
          size: 14
        },
      
      },
      deferred: false,
      legend: false
    },

  };

   _chartColors:Array<any> = [{
       backgroundColor: 'red',
        borderColor: 'red',
        pointBackgroundColor: 'red',
        pointBorderColor: 'red',
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red' 
      }];


      //public ChartType = 'bar';
  public ChartType = 'pie';
  
  
  constructor(private us: UsersService, private jobService: JobsService, private matchingService: MatchingService, private excelService:ExcelServiceService) { }

  //displayedColumns: string[] = ['id', 'title', 'action'];
  displayedColumns: string[] = ['id', 'name', 'role', 'available', 'expsalary', 'score', 'action'];

  dataSource = new MatTableDataSource(this.recruits);
 
  @ViewChild(MatPaginator, {static: true}) 
  paginator: MatPaginator;  
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();    
  }
  
  

  ngOnInit() {
    console.log(this.dataSource);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getAvailableJobs();//
    //this.getMatchedCVs('Job1');
    
    this.us
    .getUsers()
    .subscribe((data: User[]) => {
      /*
      ELEMENT_DATA.forEach(element => {
        data.push(element);
      });
      */
      this.users = data;

  });
    
  }
 
  processSeacrhJobForm() {
    this.dataSource.data = [];
    this.getMatchedCVs(this.seachJobTextInput);
  }

  getBusername(arr, value) {

    for (var i=0, iLen=arr.length; i<iLen; i++) {
  
      if (arr[i].b == value) return arr[i];
    }
  }

  getMatchedCVs(jobID) {
    this.matchingService.matchJob(jobID)
    .subscribe(
        CVs => {
          this.recruits=[];
          
          for (const CV of CVs) {
            this.users.find(x => x.id == CV.id);
            const auser =  this.users.find(x => x.id == CV.id);
            if (auser) CV.name = auser.fullName;
             this.recruits.push(CV);
          }

          //this.recruits = CVs;
          this.recruits.sort((a, b) => b.score - a.score);
          this.dataSource.data = this.recruits;
          /*
            console.log(CVs);
             for (const CV of CVs) {
                console.log(CV);
                const data = this.dataSource.data;
                data.push(CV);
                this.dataSource.data = data;
             }
          */
          
        },
        err => {
          console.log(err);
          console.log("Loading demo data. Delete it when it works");
          let newItem =
            {
                name: 'Candidate '+jobID,
                role: 'Data Scientist',
                available: '2019/04/13',
                expsalary: '32k',
                score: 70,
                id: 7
            };
          
         
          const data = this.dataSource.data;
          data.push(newItem);

          data.push(this.listOfCandidates[Math.floor(Math.random() * Math.floor(5))+1]);
          this.dataSource.data = data;


        }
      );
      
}

getAvailableJobs() {
  this.jobService.getJobs()
  .subscribe((data: Job[]) => {
    this.jobs = data;
    console.log(data);
  },
  err => {
    console.log(err);
  });
}

exportExcel(){    
  this.excelService.exportAsExcelFile(this.listOfCandidates, 'list_of_candidates');
}



}

export interface listOfCandidates {
  name: string;
  role: string;
  available: string;
  expsalary: string;
  score: number;
  id: number
}



