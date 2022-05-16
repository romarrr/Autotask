import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  clients: Client[] = [];

  clientsSorted: Client[] = []

  searchTerm!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clients = this.route.snapshot.data['clients'];
    this.clientsSorted = this.clients.sort((a, b) => a.lastname> b.lastname? 1 : -1);
    for(var i=0; i<this.clients.length; i++) 
    {
      this.clients[i].phone = this.clients[i].phone.replace(/(.{2})/g,"$1 ");
    }
  }

}
