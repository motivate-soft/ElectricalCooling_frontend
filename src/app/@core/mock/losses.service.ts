import { Injectable } from '@angular/core';
import { Losses } from '../data/losses';

@Injectable()
export class LossesService extends Losses {
  losses = [
    {
      Name: 'PoleTip-Leading',
      Region: 'Core',
      Loss: 7000,
    },
    {
      Name: 'ShoeMid-Leading',
      Region: 'Core',
      Loss: 4000,
    },
    {
      Name: 'RotorWinding-Leading',
      Region: 'Core',
      Loss: 5500,
    },
    {
      Name: 'RotorWinding-Leading',
      Region: 'EW-NDE-Stator',
      Loss: 6000,
    },
    {
      Name: 'RotorWinding-Leading',
      Region: 'EW-DE-Stator',
      Loss: 5000,
    },
    {
      Name: 'StatorWinding',
      Region: 'Core',
      Loss: 2000,
    },
    {
      Name: 'StatorWinding',
      Region: 'EW-NDE-Stator',
      Loss: 4000,
    },
    {
      Name: 'StatorWinding',
      Region: 'EW-DE-Stator',
      Loss: 9000,
    },
    {
      Name: 'Tooth',
      Region: 'Core',
      Loss: 7000,
    },
    {
      Name: 'BackIron',
      Region: 'Core',
      Loss: 7000,
    },
  ];
  getData() {
    return this.losses;
  }
}
