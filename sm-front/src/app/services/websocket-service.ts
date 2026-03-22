import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: any;
  private messageSubject: Subject<string> = new Subject<string>();

  constructor() { }

  // 1. Conectar al servidor (al endpoint que pusimos en Java)
  connect(onConnected: () => void): void {
    const socket = new SockJS(environment.wsUrl);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      onConnected()
    }, (error: any) => {
      console.error('Error en conexión WS:', error);
    });
  }

  subscribeToGroup(groupId: number): Observable<string> {
    const topic = `/topic/group/${groupId}/updated`;
    
    this.stompClient.subscribe(topic, (sdkEvent: any) => {
      this.messageSubject.next(sdkEvent.body); // EMIT msg
    });

    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }
}