import { Routes, RouterModule } from '@angular/router';

import { ConferenceComponent } from './conference/conference.component';
import { BodyComponent } from './body/body.component';
import { EventItemComponent } from './event-item/event-item.component';

const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'conference', component: ConferenceComponent},
  {path: 'conference/:id', component: EventItemComponent}
];

export const routing = RouterModule.forRoot(routes);

// app.routes.ts

