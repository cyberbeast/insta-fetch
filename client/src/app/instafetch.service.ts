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

  getData_naive(): Promise<Results[]> {
    return Promise.resolve(RESULTS);
  }

  getData_naive_SLOWLY(): Promise<Results[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getData_naive()), 2000);
    });
  }

  search_observables(term: string): Observable<Results[]> {
    return this.http
               .get(this.apiUrl + '/?query=${term}')
               .map(response=> response.json().data as Results[]);
  }

}
