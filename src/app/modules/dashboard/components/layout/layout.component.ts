import { Component, OnInit, OnDestroy } from "@angular/core";
import { WebsocketService } from "src/app/services/websocket.service";
// import {GeminiService } from "../../services/gemini.service"
import { Gemini } from "src/app/types/gemini.d";
import { SlicePipe } from "@angular/common";
import { Subscription, Subject } from "rxjs";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"]
})
export class LayoutComponent implements OnInit, OnDestroy {
  constructor(private websocket: WebsocketService) {}

  public rawData: Gemini.Responce;
  public btcUsd: Gemini.Event;
  public chart: Chart;
  private prices: number[];
  private times: string[];
  private chartLength = 50;
  private socket: Subject<string>;

  ngOnInit() {
    this.socket = this.websocket.connect();
    this.socket.subscribe(res => {
      // console.log(res);
      const data = JSON.parse(res);
      this.generateChartData(data);
    });
  }

  ngOnDestroy() {
    this.socket.unsubscribe();
  }

  generateChartData (data: Gemini.Responce) {
    const change = data.events.find(ev => ev.type === "change");
    const time = new Date( data.timestampms).toLocaleTimeString();

    // console.log(change);
    if (change && change.side === "ask") {
      this.btcUsd = change;
      this.rawData = data;
      if (!this.prices) {
        this.prices = Array(this.chartLength).fill(change.price);
        this.times = Array(this.chartLength).fill(time);
        return;
      }
      this.prices = [...this.prices, Number(change.price)].slice(
        -this.chartLength
      );
      this.times = [...this.times, time].slice(-this.chartLength);
    }
  }
}
