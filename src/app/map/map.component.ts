import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('googleMap') el:ElementRef;
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

  loadMap() {
      const mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 17,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        const map = new google.maps.Map(this.el.nativeElement, mapProp);
  }

  ngOnInit() {
    if (typeof google !== 'undefined') {
        console.log('MapComponent.ngOnInit');
        this.loadMap();
    }
  }

}
