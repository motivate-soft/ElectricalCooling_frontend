import { Injectable } from '@angular/core';
import { Htcs } from '../data/htcs';
import { HTC } from '../models/HTC';
import { HTCcoord } from '../models/HTCcoord';


const HTCs: HTC[] = [
  {
    x: 0,
    ag: 47,
    bg: 23,
    tip: 82,
    bip: 25,
  },
  {
    x: 0.1,
    ag: 87,
    bg: 100,
    tip: 43,
    bip: 79,
  },
  {
    x: 0.2,
    ag: 96,
    bg: 94,
    tip: 39,
    bip: 53,
  },
  {
    x: 0.3,
    ag: 96,
    bg: 58,
    tip: 45,
    bip: 72,
  },
  {
    x: 0.4,
    ag: 53,
    bg: 14,
    tip: 11,
    bip: 39,
  },
  {
    x: 0.5,
    ag: 33,
    bg: 65,
    tip: 78,
    bip: 21,
  },
  {
    x: 0.6,
    ag: 25,
    bg: 38,
    tip: 48,
    bip: 55,
  },
  {
    x: 0.7,
    ag: 72,
    bg: 79,
    tip: 72,
    bip: 99,
  },
  {
    x: 0.8,
    ag: 80,
    bg: 23,
    tip: 42,
    bip: 35,
  },
  {
    x: 0.9,
    ag: 78,
    bg: 24,
    tip: 22,
    bip: 27,
  },
  {
    x: 1,
    ag: 51,
    bg: 81,
    tip: 23,
    bip: 69,
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
    return this.htcs.map((htc) => htc.ag);
  }

  getBGs() {
    return this.htcs.map((htc) => htc.bg);
  }

  getBIPs() {
    return this.htcs.map((htc) => htc.bip);
  }

  getTIPs() {
    return this.htcs.map((htc) => htc.tip);
  }

  getCoords() {
    const AGsCoords = this.htcs.map((htc) => ({
      name: 'AG',
      x: htc.x,
      y: htc.ag,
    }));
    const BGsCoords = this.htcs.map((htc) => ({
      name: 'BG',
      x: htc.x,
      y: htc.bg,
    }));
    const BIPsCoords = this.htcs.map((htc) => ({
      name: 'BIP',
      x: htc.x,
      y: htc.bip,
    }));
    const TIPsCoords = this.htcs.map((htc) => ({
      name: 'TIP',
      x: htc.x,
      y: htc.tip,
    }));

    return [...AGsCoords, ...BGsCoords, ...BIPsCoords, ...TIPsCoords];
  }

  getHTCs() {
    return this.htcs;
  }
}
