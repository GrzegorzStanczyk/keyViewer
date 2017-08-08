import { Injectable } from '@angular/core';

import { Key } from './key.model';
import { KEYS } from './key-mock';

@Injectable()
export class KeyService {
  getKeys(): Promise<Key[]> {
    return Promise.resolve(KEYS);
  }
  constructor() { }

}
