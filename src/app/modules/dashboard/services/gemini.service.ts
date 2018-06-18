import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';

import { WebsocketService } from 'src/app/services/websocket.service';
import { Gemini } from 'src/app/types/gemini.d';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  constructor(private websocket: WebsocketService) { }

  public data: Gemini.Responce;
  public btcUsd: Gemini.Event;

  // getOnlineRateFor(pair = 'BTCUSD'): Gemini.Event[] {
    // return this.websocket.connect().observers
    //   .map(res => {
    //     const data: Gemini.Responce = JSON.parse(res);
    //     return data.events;
    //   }).find(ev => ev.type === 'change');

    // socket.subscribe((res) => {
    //   console.log('\nsubscribe', JSON.parse(res));
    //   this.data = JSON.parse(res);
    //   const change = this.data.events.find(ev => ev.type === 'change');
    //   if (change) {
    //     this.btcUsd = change;
    //   }

    // });
  // }
}
