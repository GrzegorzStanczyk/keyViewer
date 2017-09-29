export class Key {
    public $key: string;
    constructor(
        public streetName: string, 
        public lat: number, 
        public lng: number,
        public radius: number, 
        public key: string,
        public note: string) {            
        }
}