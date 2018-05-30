import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';


interface TradeEvent {
  type: string;
  side: string;
  price: string;
  remaining: string;
  delta: string;
  reason: string;
}

interface TradeResponce {
  type: string;
  eventId: number;
  timestamp: number;
  timestampms: number;
  socket_sequence: number;
  events: TradeEvent[];
}


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {

  constructor(private websocket: WebsocketService) { }

  public data: TradeResponce;
  public btcUsd: TradeEvent;

  ngOnInit() {
    const socket = this.websocket.connect();

    socket.subscribe((res) => {
      console.log('\nsubscribe', JSON.parse(res));
      this.data = JSON.parse(res);
      const change = this.data.events.find(ev => ev.type === 'change');
      if (change) {
        this.btcUsd = change;
      }

    });

  }

}
