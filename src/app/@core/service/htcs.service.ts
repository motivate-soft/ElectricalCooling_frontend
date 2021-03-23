import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Htcs } from '../data/htcs';
import { HTC } from '../models/HTC';
import { HTCcoord } from '../models/HTCcoord';



@Injectable()
export class HtcsService extends Htcs {
  htcs: HTC[] = [];
  htcs$: Subject<HTC[]> = new Subject<HTC[]>();

  constructor() {
    super();
    this.htcs$.subscribe(value => this.htcs = value);
  }

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
}
