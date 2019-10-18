import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  private _connection: HubConnection;
  username: string;
  message: string;
  messages: Message[] = [];

  constructor() { }

  ngOnInit() {
    this._connection = new HubConnectionBuilder().withUrl('https://localhost:44390/room').build();

    this._connection.start()
    .then(() => console.log("Connection Opened"))
    .catch(err => console.log('Connection failed: ' + err));

    this._connection.on('messageReceived', (user: string, msg: string) => {
      let message: Message = {
        message: msg,
        username: user
      };
      console.log("Message received");
      this.messages.push(message);
    });
  }

  postMessage() {
    console.log("Sending message " + this.username + " " + this.message);
    this._connection.send('NewMessage', this.username, this.message);
  }

}
