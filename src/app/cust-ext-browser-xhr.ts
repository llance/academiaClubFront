import {Injectable} from "@angular/core";
import {BrowserXhr} from "@angular/http";
@Injectable()
/**
 * We're extending the BrowserXhr to support CORS
 */
export class CustExtBrowserXhr extends BrowserXhr {
  constructor() {
      super();
  }
  build(): any {
    let xhr = super.build();
    xhr.withCredentials = true;             
    return <any>(xhr);
  }
}