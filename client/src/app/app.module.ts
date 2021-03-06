import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import {MdToolbarModule} from '@angular/material';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {InstafetchService} from './instafetch.service';

import { AppComponent } from './app.component';
import { PromiseComponent } from './promise/promise.component';
import { ObservableComponent } from './observable/observable.component';
import { RealtimeComponent } from './realtime/realtime.component';
import { ReviewminerComponent } from './reviewminer/reviewminer.component';

@NgModule({
  declarations: [
    AppComponent,
    PromiseComponent,
    ObservableComponent,
    RealtimeComponent,
    ReviewminerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
