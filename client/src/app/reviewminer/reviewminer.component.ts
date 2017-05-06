import { Component, OnInit } from '@angular/core';
import { ReviewminerService } from '../reviewminer.service';
import { FormControl } from '@angular/forms';
import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'app-reviewminer',
  templateUrl: './reviewminer.component.html',
  styleUrls: ['./reviewminer.component.css'],
  providers: [ReviewminerService]
})
export class ReviewminerComponent implements OnInit {
  results_observable = [];
  queryField:FormControl = new FormControl()

  constructor(private rmservice:ReviewminerService) {
    this.queryField.valueChanges
      .debounceTime(400)
      .subscribe(query => {
        console.log("OB Request: " + query);
        this.rmservice.getPredictions_observable(query)
                              .subscribe(result => this.results_observable = result);
      });
  }

  ngOnInit() {
  }

}
