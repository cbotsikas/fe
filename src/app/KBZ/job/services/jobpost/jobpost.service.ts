import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Jobpost } from '../../layout/job/jobpost';

@Injectable({
  providedIn: 'root'
})
export class JobpostService {

  private serverurl = 'http://localhost:8000/jobpost';

  constructor(private httpClient: HttpClient) { }

  public get() {
    return this.httpClient.get(this.serverurl);
  }

  public getSkills() {
    return this.httpClient.get(this.serverurl);
  }


  public getAlljobs() {
    return this.httpClient.get(this.serverurl);
  }

  public postJob (job) {
    return this.httpClient.post(this.serverurl, JSON.stringify(job));

  }

  createJob(job: Jobpost): Observable<Jobpost> {
    const httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json');
    const options = {
        headers: httpHeaders
    };
    console.log('>>>>>>>>>>>>>>');
    console.log(JSON.stringify(job));
    return this.httpClient.post<Jobpost>(this.serverurl, JSON.stringify(job), options);
    // return this.httpClient.post<Jobpost>(this.serverurl, job, options);

  }

  postArticle(job: Jobpost): Observable<HttpResponse<Jobpost>> {
    const httpHeaders = new HttpHeaders({
         'Content-Type' : 'application/json'
    });
    return this.httpClient.post<Jobpost>(this.serverurl, job,
        {
          headers: httpHeaders,
          observe: 'response'
        }
    );
  }

}
