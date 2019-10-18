import { Injectable, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LobbyService implements OnInit {

  private _connection: HubConnection;

  constructor() { }

  ngOnInit() {
    this._connection = new HubConnectionBuilder().withUrl('https://localhost:44390/room').build();

    this._connection.start()
    .then(() => console.log("Connection Opened"))
    .catch(err => console.log('Connection failed: ' + err));

    this._connection.on('messageReceived', (username: string, message: string) => {
      
    });
  }
}
