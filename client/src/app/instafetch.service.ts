import {AppSettings} from './config/config';
import {Result} from './result-interface';
import {RESULTS} from './mock-results';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';


@Injectable()
export class InstafetchService {
  public apiUrl: String = AppSettings.API_URL;
  private socket;
  private socket_cache;
  private socket_distributed_cache;

  constructor(private http: Http) {
    console.log(this.apiUrl);
  }

  getPredictions_promise(kw: string): Promise<any[]> {
    return this.http
              .get(this.apiUrl + `/promise?keyword=${kw}`)
              .toPromise()
              .then(this.extractData);
  }

  // getPredictions_naive_SLOWLY(): Promise<any[]> {
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(this.getPredictions_promise()), 2000);
  //   });
  // }

  getPredictions_observable(kw: string): Observable<any[]> {
    return this.http
               .get(this.apiUrl + `/observable?keyword=${kw}`)
               .map(response=> response.json().data as any[]);
  }

  getPredictions_realtime(term: string): void{
    this.socket.emit('request', term);
  }

  syncData_realtime(term: string): void{
    this.socket_cache.emit('sync', term);
  }

  prediction_channel(): Observable<any[]>{
    let observable = new Observable(observer => {
        this.socket = io(this.apiUrl);
        this.socket.on('predictions', (data) => {
          console.log("WS RES: " + JSON.stringify(data["data"]));
          observer.next(data["data"]);
        });
        return () => {
          this.socket.disconnect();
        };
      })
      return observable;
  }

  datasync_channel(): Observable<Result>{
    let observable = new Observable(observer => {
        this.socket_cache = io(this.apiUrl);
        this.socket_cache.on('sync_response', (data) => {
          console.log("Response received for " + data['query']);
          observer.next(data);
        });
        return () => {
          this.socket_cache.disconnect();
        };
      })
      return observable;
  }

  cachesync_channel(): Observable<Result>{
    let observable = new Observable(observer => {
        // this.socket_cache = io(this.apiUrl);
        this.socket_cache.on('cache_sync', (data) => {
          console.log("Cache Updated!");
          // console.log("Cache Updated! " + data['query']);
          observer.next(data);
        });
        return () => {
          this.socket_cache.disconnect();
        };
      })
      return observable;
  }

  private extractData(res: Response) {
        let body = res.json();
        // console.log("Response: " + JSON.stringify(body));
        return body || {};
    }
}
