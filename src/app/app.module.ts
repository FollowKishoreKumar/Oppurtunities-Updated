import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { OppurtunityComponent } from './oppurtunity/oppurtunity.component';
import { OppurtunityService } from './oppurtunity.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OppurtunityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [OppurtunityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
