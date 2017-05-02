import {AppSettings} from './config/config';
import {Results} from './results';
import {RESULTS} from './mock-results';

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class InstafetchService {
  public apiUrl: String = AppSettings.API_URL;

  constructor(private http: Http) {
    console.log(this.apiUrl);
  }

  getPredictions_promise(): Promise<any[]> {
    return Promise.resolve(RESULTS);
  }

  getPredictions_naive_SLOWLY(): Promise<any[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getPredictions_promise()), 2000);
    });
  }

  getPredictions_observable(term: string): Observable<any[]> {
    return this.http
               .get(this.apiUrl + '/?query=${term}')
               .map(response=> response.json().data as any[]);
  }

  // getPredictions_realtime(term: string): Observable<any[]>{
  //
  // }

}
