import { Injectable } from "@angular/core";
import { Passages } from "../data/passages";
import { Passage } from "./../../models/Passage";

@Injectable()
export class PassagesService extends Passages {
  private passages: Passage[] = [
    {
      Passage: "OH_StatorFluid_EW-NDE-Stator",
      In_Passage: "Ambient",
      Out_Passage: "OH_RotorFluid_EW-NDE-Rotor,BarrelGap_Core",
      Flow_Rate: 3.53,
      Fluid: "Air",
    },
    {
      Passage: "OH_RotorFluid_EW-NDE-Rotor",
      In_Passage: "OH_StatorFluid_EW-NDE-Stator",
      Out_Passage: "AirGap-TopIP_Core,BtmIP_Core",
      Flow_Rate: 2.06,
      Fluid: "Air",
    },
    {
      Passage: "BarrelGap_Core",
      In_Passage: "OH_StatorFluid_EW-NDE-Stator",
      Out_Passage: "OH_StatorFluid_EW-DE-Stator",
      Flow_Rate: 1.47,
      Fluid: "Air",
    },
    {
      Passage: "AirGap-TopIP_Core",
      In_Passage: "OH_RotorFluid_EW-NDE-Rotor",
      Out_Passage: "OH_RotorFluid_EW-DE-Rotor",
      Flow_Rate: 1.65,
      Fluid: "Air",
    },
    {
      Passage: "BtmIP_Core",
      In_Passage: "OH_RotorFluid_EW-NDE-Rotor",
      Out_Passage: "OH_RotorFluid_EW-DE-Rotor",
      Flow_Rate: 0.41,
      Fluid: "Air",
    },
    {
      Passage: "OH_StatorFluid_EW-DE-Stator",
      In_Passage: "BarrelGap_Core",
      Out_Passage: "OH_RotorFluid_EW-DE-Rotor",
      Flow_Rate: 1.47,
      Fluid: "Air",
    },
    {
      Passage: "OH_RotorFluid_EW-DE-Rotor",
      In_Passage: "AirGap-TopIP_Core,BtmIP_Core,OH_StatorFluid_EW-DE-Stator",
      Out_Passage: "Ambient",
      Flow_Rate: 3.53,
      Fluid: "Air",
    },
  ];
  getData() {
    return this.passages;
  }
}
