import { Component, OnInit, OnDestroy } from "@angular/core";
import { WebsocketService } from "src/app/services/websocket.service";
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

  public data: Gemini.Responce;
  public btcUsd: Gemini.Event;
  public chart: Chart;
  private prices: number[];
  private times: string[];
  private chartLength = 50;
  private socket: Subject<string>;

  ngOnInit() {
    this.socket = this.websocket.connect();
    console.log(this.socket);
    // let i = 10;
    // setInterval(() => {
    //   if (!this.prices) {
    //     this.prices = [i++];
    //     this.times = ['02'];
    //     this.btcUsd = {} as Gemini.Event;
    //   }
    //   this.prices.push(i++);
    //   this.times.push('02' + i);
    // }, 1000);
    let time;
    this.socket.subscribe(res => {
      // console.log(res);
      this.data = JSON.parse(res);
      const change = this.data.events.find(ev => ev.type === "change");
      time = new Date(this.data.timestampms).toLocaleTimeString();

      // console.log(change);
      if (change && change.side === "ask") {
        this.btcUsd = change;
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
    });
  }

  ngOnDestroy() {
    this.socket.unsubscribe();
  }
}
