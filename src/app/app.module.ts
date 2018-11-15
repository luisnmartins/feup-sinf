import { ApiCallsService } from './api-calls.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiTestingComponent } from './api-testing/api-testing.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiTestingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
