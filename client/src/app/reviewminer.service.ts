import {AppSettings} from './config/config';

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ReviewminerService {
  public apiUrl: String = AppSettings.REVIEW_MINER_SERVER_URL;

  getPredictions_observable(kw: string): Observable<any[]> {
    console.log("Rec:");
    return this.http
               .get(this.apiUrl + `/graphql?query=${kw}`)
               .map(response=> response.json().data as any[]);
  }

  constructor(private http: Http) { }

}
