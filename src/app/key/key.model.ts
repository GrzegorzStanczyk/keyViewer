export class Key {
    public latLng: number;
    // public note: string;
    constructor(
        public streetName: string, 
        public lat: number, 
        public lng: number,
        public radius: number, 
        public key: string,
        public note: string) {            
        }
    public setLatLng() {
        // this.latLng = new google.maps.LatLng(this.lat, this.lng)
    }

    public setNote(note): void {
        this.note = note;
    }
}