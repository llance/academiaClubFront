import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import {CustExtBrowserXhr} from './app/cust-ext-browser-xhr';
import { BrowserXhr, HttpModule } from '@angular/http';


if (environment.production) {
    console.log("production mode!");
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, [
    HttpModule,
    { provide: BrowserXhr, useClass: CustExtBrowserXhr }]);

