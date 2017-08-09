import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('googleMap') el: ElementRef;

  lat: number = 52.176585;
  lng: number = 20.996074;
  constructor() { }

  getPlaceOnChange(place) {
    console.log(place)

    const map = new google.maps.Map(this.el.nativeElement)
    var marker = new google.maps.Marker();
    marker.set('map', map);
    marker.set('anchorPoint', new google.maps.Point(0, -29));

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  }

  loadMap(coords) {
    console.log("loadmap()")
    const mapProp = {
      center: new google.maps.LatLng(coords.lat, coords.lng),
      zoom: 17,
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(this.el.nativeElement, mapProp);
  }

  setCurrentPosition(): any {
    console.log("setCurrentPosition()")

    return new Promise(resolve => {
      if ("geolocation" in navigator) {
        return navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          resolve({ lat: this.lat, lng: this.lng })
        }, this.showError, { enableHighAccuracy: true });
      }
    })
  }

  showError(error): void {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.")
        break;
    }
  }

  ngOnInit() {
    if (typeof google !== 'undefined') {
      console.log('MapComponent.ngOnInit');
      this.setCurrentPosition()
        .then(v => {
          console.log(v)
          return this.loadMap(v);
        });
    }
  }

}
