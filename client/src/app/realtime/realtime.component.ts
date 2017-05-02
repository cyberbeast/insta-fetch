import { Component, OnInit } from '@angular/core';
import { InstafetchService } from '../instafetch.service';


@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {
  results_realtime = [];

  constructor(private ifservice:InstafetchService){}

  getPredictionsWithRealtime(): void {
    // Assuming no latency the following implementation will work, however, data is rarely available without latency and hence the line below is not ideal.
    // this.results_naive = this.ifservice.getData_naive();

    // Use the insta-fetch service to make your client component a promise and let your implementation act on that promise instead.
    this.ifservice.getPredictions_promise().then(output => this.results_realtime = output);

    // Uncomment the next line to see how promises work assuming a server latency of 2 seconds
    // this.ifservice.getData_naive_SLOWLY().then(output => this.results_naive = output);


  }

  ngOnInit() {
  }

}
