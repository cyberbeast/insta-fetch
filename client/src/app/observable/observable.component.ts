import { Component, OnInit } from '@angular/core';
import { InstafetchService } from '../instafetch.service';
import { FormControl } from '@angular/forms';
import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
  results_observable = [];
  queryField:FormControl = new FormControl();

  constructor(private ifservice:InstafetchService){
    this.queryField.valueChanges
      .debounceTime(400)
      .subscribe(query => {
        console.log("OB Request: " + query);
        this.ifservice.getPredictions_observable(query)
                              .subscribe(result => this.results_observable = result);
      })
  }

  // getPredictionsWithObservable(): void {
  //   // Assuming no latency the following implementation will work, however, data is rarely available without latency and hence the line below is not ideal.
  //   // this.results_naive = this.ifservice.getData_naive();
  //
  //   // Use the insta-fetch service to make your client component a promise and let your implementation act on that promise instead.
  //   // this.ifservice.getPredictions_promise().then(output => this.results_observable = output);
  //
  //   // Uncomment the next line to see how promises work assuming a server latency of 2 seconds
  //   // this.ifservice.getData_naive_SLOWLY().then(output => this.results_naive = output);
  //
  //
  // }

  ngOnInit() {
  }

}
