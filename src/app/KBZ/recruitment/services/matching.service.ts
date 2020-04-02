import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class MatchingService {

  private serverurl = 'http://localhost:8000/jobmatching';

  constructor(private httpClient: HttpClient) { }

  public matchJob (jobID): Observable<any> {


    /*
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      params:  new  HttpParams().set('jobid', jobID)
    };
    */

    const  params = new  HttpParams().set('jobid', jobID);
    return this.httpClient.get(this.serverurl, {responseType: 'json', params});
  }

}
