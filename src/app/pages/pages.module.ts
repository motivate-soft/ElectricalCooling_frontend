import { NgModule } from "@angular/core";
import { NbButtonModule, NbCardModule, NbMenuModule } from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { DimensionsLossesModule } from "./dimensions-losses/dimensions-losses.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { CoolingFlowModule } from "./cooling-flow/cooling-flow.module";
import { HeatTransferCoefficientsModule } from "./heat-transfer-coefficients/heat-transfer-coefficients.module";
import { ResultComponent } from "./result/result.component";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbButtonModule,
    Ng2SmartTableModule,

    MiscellaneousModule,
    DimensionsLossesModule,
    CoolingFlowModule,
    HeatTransferCoefficientsModule,
  ],
  declarations: [PagesComponent, ResultComponent],
})
export class PagesModule { }
