import { GeolocationService } from './../../services/geolocation.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import GeolocationModel from 'src/models/geolocation.model';

@Component({
  selector: 'app-ip-address-tracker',
  templateUrl: './ip-address-tracker.component.html',
  styleUrls: ['./ip-address-tracker.component.scss'],
})
export class IpAddressTrackerComponent implements OnInit, OnDestroy {
  map: Leaflet.Map;
  data: GeolocationModel;
  ipInput: string;
  constructor(private geolocationService: GeolocationService) {
    this.ipInput = '';
  }

  ngOnInit(): void {
    const promise1 = new Promise((resolve) => {
      this.geolocationService
        .getGeolocationIp()
        .subscribe((response: GeolocationModel) => {
          this.data = response;
          resolve(response);
        });
    });
    Promise.all([promise1]).then((_) => {
      this.refrestmap();
    });
  }

  refrestmap() {
    this.map = Leaflet.map('map').setView(
      [this.data.location.lat, this.data.location.lng],
      18
    );
    var iconDark = Leaflet.icon({
      iconUrl: './assets/icon-location.png',
    });
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);

    Leaflet.marker([this.data.location.lat, this.data.location.lng], {
      icon: iconDark,
    })
      .addTo(this.map)
      .openPopup();
  }
  ngOnDestroy(): void {
    this.map.remove();
  }
  searchGeolocation(): void {
    this.geolocationService
      .getGeolocationIp(this.ipInput)
      .subscribe((response: GeolocationModel) => {
        this.data = response;
        this.ngOnDestroy();
        this.refrestmap();
      });
    alert('No se encontro la dirección IP');
  }
}
