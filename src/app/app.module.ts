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

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailEntryComponent } from './detail-entry/detail-entry.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminComponent } from './admin/admin.component';
import { PlayerSelectComponent } from './player-select/player-select.component';
import { PlayerSelectEditComponent } from './player-select-edit/player-select-edit.component';
import { DashboardTeamComponent } from './dashboard-team/dashboard-team.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    AddEntryComponent,
    EditEntryComponent,
    LoginComponent,
    DetailEntryComponent,
    RegisterComponent,
    FooterComponent,
    DetailUserComponent,
    EditUserComponent,
    AdminComponent,
    PlayerSelectComponent,
    PlayerSelectEditComponent,
    DashboardTeamComponent,
    DashboardComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, EntriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
