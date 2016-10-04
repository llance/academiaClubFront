import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { ConferenceComponent } from './conference/conference.component';

import { ConferenceApiService } from './conference-api.service';

import { routing } from './app.routes';
import { EventItemComponent } from './event-item/event-item.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { MissionComponent } from './mission/mission.component';
import { ContactComponent } from './contact/contact.component';
import { ConditionComponent } from './condition/condition.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    ConferenceComponent,
    EventItemComponent,
    AboutComponent,
    FaqComponent,
    MissionComponent,
    ContactComponent,
    ConditionComponent
  ],
  providers: [ConferenceApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

