import { RouterModule, Routes } from '@angular/router';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { AdminComponent } from './admin/admin.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EntriesComponent } from './entries/entries.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DetailEntryComponent } from './detail-entry/detail-entry.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-entry', component: AddEntryComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'entries', component: EntriesComponent },
  { path: 'edit-entry/:id', component: EditEntryComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'detail-entry/:id', component: DetailEntryComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'detail-user/:id', component: DetailUserComponent},
  { path: 'edit-user/:id', component: EditUserComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '', component: EntriesComponent}
];

export const routing = RouterModule.forRoot(routes);