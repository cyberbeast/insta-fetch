import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import {MdToolbarModule} from '@angular/material';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {InstafetchService} from './instafetch.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule
    // MdToolbarModule
    // BrowserAnimationsModule
  ],
  providers: [
    InstafetchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
