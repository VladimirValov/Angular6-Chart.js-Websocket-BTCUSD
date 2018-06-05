export declare module Gemini {
    
interface Event {
    type: string;
    side: string;
    price: string;
    remaining: string;
    delta: string;
    reason: string;
  }
  
  interface Responce {
    type: string;
    eventId: number;
    timestamp: number;
    timestampms: number;
    socket_sequence: number;
    events: Event[];
  }
}