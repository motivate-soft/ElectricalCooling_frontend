import { Injectable } from '@angular/core';
import { Htcs } from '../data/htcs';
import { HTC } from './../../models/HTC';
import { HTCcoord } from './../../models/HTCcoord';


const HTCs: HTC[] = [
  {
    x: 0,
    AG: 47,
    BG: 23,
    TIP: 82,
    BIP: 25,
  },
  {
    x: 0.1,
    AG: 87,
    BG: 100,
    TIP: 43,
    BIP: 79,
  },
  {
    x: 0.2,
    AG: 96,
    BG: 94,
    TIP: 39,
    BIP: 53,
  },
  {
    x: 0.3,
    AG: 96,
    BG: 58,
    TIP: 45,
    BIP: 72,
  },
  {
    x: 0.4,
    AG: 53,
    BG: 14,
    TIP: 11,
    BIP: 39,
  },
  {
    x: 0.5,
    AG: 33,
    BG: 65,
    TIP: 78,
    BIP: 21,
  },
  {
    x: 0.6,
    AG: 25,
    BG: 38,
    TIP: 48,
    BIP: 55,
  },
  {
    x: 0.7,
    AG: 72,
    BG: 79,
    TIP: 72,
    BIP: 99,
  },
  {
    x: 0.8,
    AG: 80,
    BG: 23,
    TIP: 42,
    BIP: 35,
  },
  {
    x: 0.9,
    AG: 78,
    BG: 24,
    TIP: 22,
    BIP: 27,
  },
  {
    x: 1,
    AG: 51,
    BG: 81,
    TIP: 23,
    BIP: 69,
  },
];

@Injectable()
export class HtcsService extends Htcs {
  htcs: HTC[] = HTCs;
  coords: HTCcoord[];

  getData() {
    return this.htcs;
  }

  getXRange() {
    return this.htcs.map((htc) => htc.x);
  }

  getAGs() {
    return this.htcs.map((htc) => htc.AG);
  }

  getBGs() {
    return this.htcs.map((htc) => htc.BG);
  }

  getBIPs() {
    return this.htcs.map((htc) => htc.BIP);
  }

  getTIPs() {
    return this.htcs.map((htc) => htc.TIP);
  }

  getCoords() {
    const AGsCoords = this.htcs.map((htc) => ({
      name: 'AG',
      x: htc.x,
      y: htc.AG,
    }));
    const BGsCoords = this.htcs.map((htc) => ({
      name: 'BG',
      x: htc.x,
      y: htc.BG,
    }));
    const BIPsCoords = this.htcs.map((htc) => ({
      name: 'BIP',
      x: htc.x,
      y: htc.BIP,
    }));
    const TIPsCoords = this.htcs.map((htc) => ({
      name: 'TIP',
      x: htc.x,
      y: htc.TIP,
    }));

    return [...AGsCoords, ...BGsCoords, ...BIPsCoords, ...TIPsCoords];
  }

  getHTCs() {
    return this.htcs;
  }
}
