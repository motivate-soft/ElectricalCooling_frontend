import { Injectable } from '@angular/core';
import { Fluids } from '../data/fluids';
import { Fluid } from './../../models/Fluid';

@Injectable()
export class FluidsService extends Fluids {
  fluids: Fluid[] = [
    {
      Name: 'Air',
      Density: 1.225,
      Conductivity: 0.02,
    },
    {
      Name: 'Water',
      Density: 1000,
      Conductivity: 0.2,
    },
  ];
  getData() {
    return this.fluids;
  }
}
