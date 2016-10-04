import { Routes, RouterModule } from '@angular/router';

import { ConferenceComponent } from './conference/conference.component';
import { BodyComponent } from './body/body.component';
import { EventItemComponent } from './event-item/event-item.component';
import { FaqComponent } from './faq/faq.component';
import { MissionComponent } from './mission/mission.component';
import { ConditionComponent } from './condition/condition.component';
import { ContactComponent } from './contact/contact.component';



const routes: Routes = [
{path: '', component: BodyComponent},
{path: 'conference', component: ConferenceComponent},
{path: 'conference/:id', component: EventItemComponent},
{path: 'faq', component: FaqComponent},
{path: 'mission', component: MissionComponent},
{path: 'condition', component: ConditionComponent},
{path: 'contact', component: ContactComponent}


];

export const routing = RouterModule.forRoot(routes);

// app.routes.ts

