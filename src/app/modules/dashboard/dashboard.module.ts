import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./components/layout/layout.component";
import { GeminiService } from "./services/gemini.service";
import { ChartComponent } from "./components/chart/chart.component";

@NgModule({
  imports: [CommonModule],
  declarations: [LayoutComponent, ChartComponent],
  providers: [GeminiService],
  exports: [LayoutComponent]
})
export class DashboardModule {}
