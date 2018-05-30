import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';

@Injectable()
export class WebsocketService {

  constructor() { }

  private url = 'wss://api.gemini.com/v1/marketdata/BTCUSD';
  private subject: Subject<string>;

  public connect(): Subject<string> {
    if (!this.subject) {
      this.subject = this.createConnection();
      console.log('Connection created');
    }
    return this.subject;
  }

  private createConnection(): Subject<string> {
    const ws = new WebSocket(this.url);

    ws.onopen = () => {
      console.log('open');
      console.log(ws.readyState);
      // ws.send('test');
    };

    ws.onerror = (err) => {
      console.log('Connection error');
    };



    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = (event) => {
        // console.log('onmessage', event.data);
        obs.next(event.data);
      };
      ws.onerror = (err) => {
        console.log('onerror', err);
        obs.error(err);
      };
      ws.onclose = () => {
        console.log('onclose');
        ws.close();
      };
    });

    const observer = {
      next: (data: string) => {
        console.log(data);
        console.log(ws.readyState);
        if (ws.readyState) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
