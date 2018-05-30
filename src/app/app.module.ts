import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { WebsocketService } from './services/websocket.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
