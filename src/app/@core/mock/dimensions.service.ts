import { Injectable } from "@angular/core";
import { Dimensions } from "../data/dimensions";

@Injectable()
export class DimensionsService extends Dimensions {
  data = [
    {
      Active: true,
      Type: "Stator",
      Parameters: {
        Core_Length: 1.1,
        Stator_Outer_Diameter: 1.39,
        Stator_Inner_Diameter: 0.9,
        Slots: 72,
        Slot_Depth: 0.097,
        Slot_Width: 0.02,
        Stator_Lam_Thickness_Total: 0.5,
        Stator_Lam_Thickness_Steel: 0.495,
        Stator_Packing_Factor: 0.97,
        //   Tooth_Width: "pi*(StatorInnerDiameter+2*(SlotDepth))/Slots-SlotWidth",
        //   Tooth_Width_Airgap: "pi*(StatorInnerDiameter)/Slots-SlotWidth",
        //   Tooth_Width_Average: "pi*(StatorInnerDiameter)/Slots-SlotWidth",
      },
    },
    {
      Active: true,
      Type: "Housing",
      Parameters: {
        Housing_Diameter: 1.225,
        Housing_Thickness: 1.38,
        Housing_Length: 0.925,
        Landing_Bars: 72,
        Landing_Bar_Width: 0.0968,
        //   Housing_Inner_Diameter: "HousingDiameter-2*HousingThickness",
      },
    },
    {
      Active: true,
      Type: "Rotor",
      Parameters: {
        Airgap: 1.225,
        Shaft_Diameter: 1.38,
        Pole_Tip_Height: 0.925,
        Pole_Body_Width: 0.1,
        Pole_Body_Height: 0.0968,
        Pole_Shoe_Width: 0.0206,
        Poles: 6,
        Pole_Mid_Angle: 0.1,
        //   Pole_Body_Height: "asin((PoleBodyWidth/2)/(RotorOuterDiameter/2))",
        //   Side_Shoe_Height:
        //     "(RotorOuterDiameter/2)*cos(PoleMidAngle)-(ShaftDiameter/2+BackLamHeight+PoleBodyHeight)",
        //   Pole_Angle: "asin((PoleShoeWidth/2)/(RotorOuterDiameter/2))",
      },
    },
    {
      Active: true,
      Type: "Winding",
      Parameters: {
        Stator_Conductor_Width: 0.007,
        Stator_Conductor_Depth: 0.008,
        Stator_Layers: 2,
        Conductors_Per_Turn: 11,
        Stator_NDE_Axial_Overhang: 1.38,
        StatorDEAxialOverhang: 0.925,
        Conductors_Across_Width: 2,
        Conductor_Insulation: 0.1,
        //   Stator_NDE_Copper_Overhang:
        //     "sqrt((pi*StatorInnerDiameter/Phases*Pitch/4)**2+StatorNDEAxialOverhang**2)*1.2",
        //   Stator_Copper_Length_Per_Turn:
        //     "StatorDECopperOverhang+StatorNDECopperOverhang+CoreLength",
      },
    },
    {
      Active: true,
      Type: "Magnet",
      Parameters: {
        Rotor_Conductor_Columns: 14,
        Rotor_Conductors_In_Parallel: 1,
        Rotor_Conductor_Depth: 0.005,
        Rotor_Conductor_Width: 0.005,
        Conductor_Insulation_Rotor: 0.25,
        Rotor_NDE_Axial_Overhang: 0.09,
        Rotor_DEAxial_Overhang: 0.09,
        //   Rotor_Winding_Width:
        //     "RotorConductorColumns*(RotorConductorWidth+2*ConductorInsulationRotor/1000)",
        //   Rotor_Winding_Depth:
        //     "RotorConductorRows*RotorConductorDepth+2*ConductorInsulationRotor*RotorConductorRows/1000",
      },
    },
    {
      Active: true,
      Type: "Operation",
      Parameters: {
        Speed: 1500,
      },
    },
  ];

  getData() {
    return this.data;
  }

  getTabData(key: string) {
    const tabObject = this.data.find((item) => item.Type === key);
    return tabObject.Parameters;
  }
}
