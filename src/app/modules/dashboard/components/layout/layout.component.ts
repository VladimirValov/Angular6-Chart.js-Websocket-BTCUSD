import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Gemini } from 'src/app/types/gemini.d';
import { Chart, ChartDataSets, ChartData } from 'chart.js';
import { SlicePipe } from '@angular/common';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {

  constructor(private websocket: WebsocketService) { }

  public data: Gemini.Responce;
  public btcUsd: Gemini.Event;
  public chart: Chart;
  private prices: number[] = [];
  private labels: string[] = [];
  private chartLength = 30;

  ngOnInit() {
    const socket = this.websocket.connect();
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.prices,
          borderColor: 'rgb(54, 162, 235)', // line color
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // fill color
        }]
      },
      options: {
        animation: {
          duration: 0,
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
    let time = new Date().getTime();
    socket.subscribe((res) => {
      this.data = JSON.parse(res);
      const change = this.data.events.find(ev => ev.type === 'change');

      if (change && new Date().getTime() - time > 500) {
        time = new Date().getTime();
        this.btcUsd = change;
        this.prices = [...this.prices, Number(change.price)].slice(-this.chartLength);
        this.labels = [...this.labels, new Date(time).getSeconds().toString()].slice(-this.chartLength);

        this.chart.data.datasets.forEach(dataset => {
          dataset.data = this.prices;
        });
        this.chart.data.labels = this.labels;
        this.chart.update();
      }

    });

  }

}
