import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EntriesComponent } from './entries/entries.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { LoginComponent } from './login/login.component';

import { routing } from './app.routing';
import { AuthenticationService } from './authentication.service';
import { EntriesService } from './entries.service';
import { GlobalService } from './global.service';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailEntryComponent } from './detail-entry/detail-entry.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    AddEntryComponent,
    EditEntryComponent,
    LoginComponent,
    DetailEntryComponent,
    RegisterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, EntriesService, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
