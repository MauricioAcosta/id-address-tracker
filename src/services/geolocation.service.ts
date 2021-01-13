import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  url: string;
  apiKey: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.url;
    this.apiKey = environment.apiKey;
  }
  /**
   * get Geolocation Ip
   */
  public getGeolocationIp(ipAddress?: string) {
    let url = this.url + '?apiKey=' + this.apiKey;
    if (ipAddress) {
      console.log('getGeolocationIp ipAddress');

      url = url + '?' + ipAddress;
    }
    return this.httpClient.get(url);
  }
}
