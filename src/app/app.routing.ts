import { RouterModule, Routes } from '@angular/router';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { EntriesComponent } from './entries/entries.component';
import { DetailEntryComponent } from './detail-entry/detail-entry.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-entry', component: AddEntryComponent },
  { path: 'entries', component: EntriesComponent },
  { path: 'edit-entry/:id', component: EditEntryComponent },
  { path: 'detail-entry/:id', component: DetailEntryComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'detail-user/:id', component: DetailUserComponent},
  { path: '', component: LoginComponent}
];

export const routing = RouterModule.forRoot(routes);