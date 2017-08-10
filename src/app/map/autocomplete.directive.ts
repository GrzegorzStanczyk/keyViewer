import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  private element: HTMLInputElement;

  constructor(private el: ElementRef) { 
    this.element = el.nativeElement;
  }

  ngOnInit() {
    const searchBox = new google.maps.places.SearchBox(this.element);
    
    searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces();
          this.onSelect.emit(places[0]);
    })
  }
}
