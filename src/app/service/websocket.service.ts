// src/app/services/websocket.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Notification } from '../models/notification';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

private stompClient: Client;
  private notificationSubject = new Subject<Notification>();
  private isConnected: boolean = false;

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8088/ws'), // Ajustez le port si nécessaire
      debug: (str) => console.log('WebSocket Debug:', str), // Activer les logs pour débogage
      reconnectDelay: 5000, // Tentative de reconnexion toutes les 5 secondes en cas d'échec
    });
  }

  initializeWebSocketConnection(participationId: number) {
    if (this.isConnected) {
      console.log('WebSocket déjà connecté.');
      return;
    }

    this.stompClient.onConnect = (frame) => {
      console.log('Connecté au WebSocket:', frame);
      this.isConnected = true;
      this.stompClient.subscribe(`/topic/notifications/${participationId}`, (message) => {
        console.log('Message reçu:', message.body);
        try {
          const notification: Notification = JSON.parse(message.body);
          this.notificationSubject.next(notification);
        } catch (e) {
          console.error('Erreur de parsing du message:', e);
        }
      });
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('Erreur WebSocket:', error);
      this.isConnected = false;
    };

    this.stompClient.onDisconnect = () => {
      console.log('Déconnecté du WebSocket.');
      this.isConnected = false;
    };

    this.stompClient.activate(); // Démarre la connexion
  }

  sendMessage(destination: string, message: any) {
    if (this.stompClient && this.isConnected) {
      this.stompClient.publish({ destination, body: JSON.stringify(message) });
      console.log('Message envoyé:', message);
    } else {
      console.error('WebSocket non connecté, impossible d\'envoyer le message.');
    }
  }

  getNotifications() {
    return this.notificationSubject.asObservable();
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('Déconnexion WebSocket effectuée.');
    }
  }
}