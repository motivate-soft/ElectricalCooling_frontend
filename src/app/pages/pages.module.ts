import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { DimensionsLossesModule } from "./dimensions-losses/dimensions-losses.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { CoolingFlowModule } from "./cooling-flow/cooling-flow.module";
import { HeatTransferCoefficientsModule } from "./heat-transfer-coefficients/heat-transfer-coefficients.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    DimensionsLossesModule,
    CoolingFlowModule,
    HeatTransferCoefficientsModule,
  ],
  declarations: [PagesComponent],
})
export class PagesModule {}
