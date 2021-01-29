import { NgModule } from "@angular/core";
import { DimensionsComponent } from "./dimensions/dimensions.component";
import { FormsModule } from "@angular/forms";
import { ThemeModule } from "../../@theme/theme.module";
import { NbButtonModule, NbCardModule, NbTabsetModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ParamsTableComponent } from "./params-table/params-table.component";

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbButtonModule,
    Ng2SmartTableModule,
  ],
  declarations: [DimensionsComponent, ParamsTableComponent],
})
export class DimensionsLossesModule {}
