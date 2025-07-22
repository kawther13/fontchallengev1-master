import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../service/websocket.service';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-participant-notification',
  standalone: true,
  imports: [],
  templateUrl: './participant-notification.component.html',
  styleUrl: './participant-notification.component.css'
})
export class ParticipantNotificationComponent {
}