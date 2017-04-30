import { Component, OnInit } from '@angular/core';
import { InstafetchService } from './instafetch.service';
import {Results} from './results';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  results_naive: Results[];

  getResultsNaive(): void {
    // Assuming no latency the following implementation will work, however, data is rarely available without latency and hence the line below is not ideal.
    // this.results_naive = this.ifservice.getData_naive();

    // Use the insta-fetch service to make your client component a promise and let your implementation act on that promise instead.
    this.ifservice.getData_naive().then(output => this.results_naive = output);

    // Uncomment the next line to see how promises work assuming a server latency of 2 seconds
    // this.ifservice.getData_naive_SLOWLY().then(output => this.results_naive = output);


  }

  ngOnInit(): void{

  }
  constructor(private ifservice:InstafetchService){}
}
