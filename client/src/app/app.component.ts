import { Component, OnInit } from '@angular/core';
import { InstafetchService } from './instafetch.service';

// import {Results} from './results';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';


  // results_naive: Results[];

  ngOnInit(): void{

  }
  constructor(private ifservice:InstafetchService){}
}
