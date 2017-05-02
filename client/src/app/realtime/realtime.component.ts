import { Component, OnInit, OnDestroy } from '@angular/core';
import { InstafetchService } from '../instafetch.service';
import { FormControl } from '@angular/forms';
import "rxjs/add/operator/debounceTime";
import { Result } from '../result-interface';
import {PairsPipe} from 'ngx-pipes/src/app/pipes/object/pairs';


@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css'],
  providers: [PairsPipe]
})

export class RealtimeComponent implements OnInit, OnDestroy {
  results_realtime = [];
  cache_results_realtime = [];
  cache_realtime: Result[] = [{'query': '', 'data': ['']}];

  cache_mode_bool: boolean = false;

  queryField:FormControl = new FormControl();

  connection;
  cache_connection;

  constructor(private ifservice:InstafetchService, private pairsPipe: PairsPipe){
    this.queryField.valueChanges
      // .debounceTime(400)
      .subscribe(query => {
        if (this.cache_mode_bool) {
          if (this.cache_realtime.length > 0) {
            var cacheFound = false;
            for (var entry of this.cache_realtime){
              if ( query === entry['query']){
                console.log("Query in local cache");
                this.cache_results_realtime = entry['data'];
                cacheFound = true;
              }
            }
            if (!cacheFound) {
                console.log("Query not in local cache " + query);
                this.ifservice.syncData_realtime(query);
              }
            }
          else {
            console.log("First time")
            this.ifservice.syncData_realtime(query);
          }
        }
        else {
          console.log("WS Request: " + query);
          this.ifservice.getPredictions_realtime(query);
        }

      })
  }

  getPredictionsWithRealtime(): void {
    // Assuming no latency the following implementation will work, however, data is rarely available without latency and hence the line below is not ideal.
    // this.results_naive = this.ifservice.getData_naive();

    // Use the insta-fetch service to make your client component a promise and let your implementation act on that promise instead.
    // this.ifservice.getPredictions_promise().then(output => this.results_realtime = output);

    // Uncomment the next line to see how promises work assuming a server latency of 2 seconds
    // this.ifservice.getData_naive_SLOWLY().then(output => this.results_naive = output);


  }

  ngOnInit() {
    this.connection = this.ifservice.prediction_channel().subscribe(message => this.results_realtime = message);

    this.cache_connection = this.ifservice.datasync_channel().subscribe(db => {
        this.cache_results_realtime = db['data'];
        this.cache_realtime.push(<Result>db);
    });

    this.ifservice.syncData_realtime('');
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
