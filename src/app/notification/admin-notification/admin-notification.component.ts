import { Component, Inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../../service/websocket.service';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Component({
  selector: 'app-admin-notification',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-notification.component.html',
  styleUrl: './admin-notification.component.css'
})
export class AdminNotificationComponent {

challengeId: number | null = null;
  titre: string = '';
  message: string = '';
SocketClient: any =null; 


  sendNotification() {
   
  }

  ngOnInit():void{
 const token = localStorage.getItem('token'); // récupère le token directement depuis le localStorage
  if (token) {
    let ws = new SockJS('http://localhost:8088/api/v1/ws');
    this.SocketClient=Stomp.over(ws);
    this.SocketClient.connect({'Authorization:':'Bearer'+token},()=>{
      console.log('connect to ws ')
    });
  }
    
  }
}