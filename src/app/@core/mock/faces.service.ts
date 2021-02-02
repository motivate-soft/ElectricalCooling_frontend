import { Injectable } from '@angular/core';
import { Faces } from '../data/faces';

@Injectable()
export class FacesService extends Faces {
  faces = [
    {
      "Name": "BarrelGap",
      "Passage": "BarrelGap_Core",
      "Calculation": "CFD"
    },
    {
      "Name": "AirGapRotor",
      "Passage": "AirGap-TopIP_Core",
      "Calculation": "CFD"
    },
    {
      "Name": "AirGapStator",
      "Passage": "AirGap-TopIP_Core",
      "Calculation": "CFD"
    },
    {
      "Name": "TopIP",
      "Passage": "AirGap-TopIP_Core",
      "Calculation": "CFD"
    },
    {
      "Name": "BtmIP",
      "Passage": "BtmIP_Core",
      "Calculation": "CFD"
    },
    {
      "Name": "RotorFace",
      "Passage": "None",
      "Calculation": 50
    },
    {
      "Name": "RotorSideEW",
      "Passage": "None",
      "Calculation": "EndRegion"
    },
    {
      "Name": "RotorTopEW",
      "Passage": "None",
      "Calculation": "EndRegion"
    },
    {
      "Name": "RotorGapEW",
      "Passage": "None",
      "Calculation": "EndRegion"
    },
    {
      "Name": "Shaft",
      "Passage": "None",
      "Calculation": 50
    },
    {
      "Name": "Housing",
      "Passage": "None",
      "Calculation": 20
    },
    {
      "Name": "StatorWindingGapEW",
      "Passage": "None",
      "Calculation": "EndRegion"
    },
    {
      "Name": "StatorOuterEW",
      "Passage": "None",
      "Calculation": "EndRegion"
    },
    {
      "Name": "StatorInnerEW",
      "Passage": "None",
      "Calculation": "EndRegion"
    }
  ];

  getData() {
    return this.faces;
  }
}
