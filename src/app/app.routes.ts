import { Routes, RouterModule } from '@angular/router';

import { ConferenceComponent } from './conference/conference.component';
import { BodyComponent } from './body/body.component';

const routes: Routes = [
  // {path: '', redirectTo: 'news/1', pathMatch : 'full'},
  {path: '', component: BodyComponent},
  {path: 'conference', component: ConferenceComponent},
];

export const routing = RouterModule.forRoot(routes);

// app.routes.ts

