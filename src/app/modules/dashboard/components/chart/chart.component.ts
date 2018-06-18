import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges
} from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})

export class ChartComponent implements OnInit, OnChanges {
  @Input() labels: string[] = [];
  @Input() dataset: number[] = [];
  min: number;
  max: number;
  delta = 5 / 100; // percent
  chart: Chart;

  constructor() {}

  ngOnInit() {
    this.chart = this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { labels, dataset } = changes;
    if (!this.chart || !labels || !dataset) {
      return;
    }
    this.chart.data.labels = labels.currentValue;
    this.chart.data.datasets[0].data = dataset.currentValue;
    this.chart.update();
  }

  createChart() {
    const value = this.dataset[0];
    this.min = value * (1 - this.delta);
    this.max = value * (1 + this.delta);

    return new Chart("chartID", {
      type: "line",
      data: {
        labels: this.labels,
        datasets: [{
          data: this.dataset,
          borderColor: "rgb(54, 162, 235)", // line color
          backgroundColor: "rgba(54, 162, 235, 0.5)" // fill color
        }, {
          data: [this.min, this.max], // template
          borderColor: "rgba(100, 0, 235, 0)", // line color,
          backgroundColor: "rgba(54, 162, 235, 0)" // fill color
        }]
      },
      options: {
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
  }
}
