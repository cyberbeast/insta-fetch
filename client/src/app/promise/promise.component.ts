import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { InstafetchService } from '../instafetch.service';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.css']
})
export class PromiseComponent implements OnInit, AfterViewInit {
  public query = '';
  results_promise = [];

  @ViewChild('searchbox') input: any;

  constructor(private ifservice:InstafetchService){}

  getPredictionsWithPromise(): void {
    console.log("PR Request: " + this.input.nativeElement.value);

    if (this.query === ''){
      this.results_promise = [];
    } else {
      // Use the insta-fetch service to make your client component a promise and let your implementation act on that promise instead.
      this.ifservice
        .getPredictions_promise(this.input.nativeElement.value)
         .then(output => this.results_promise = output);
    }

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log(this.input.nativeElement.value);
  }

}
