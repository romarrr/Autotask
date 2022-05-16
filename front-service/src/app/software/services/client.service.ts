import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
   
  constructor(private route: Router, private http : HttpClient) {}

  getClients(): Observable<Client[]>
  {
    return this.http.get<Client[]>("https://localhost:1001/client"); 
  }

  getClientById(id: any): Observable<Client>
  {
    let clientById = "https://localhost:1001/client/" + id;
    return this.http.get<Client>(clientById);
  }

  addClient(client: any): Observable<Client>
  {
    return this.http.post<Client>('https://localhost:1001/client', client);
  }

  updateClientById(id: any, updateFromData: any): Observable<Client>
  {
    return this.http.put<Client>("https://localhost:1001/client/" + id, updateFromData);
  }

  deleteClientById(id: string): Observable<Client>{
    let clientDelete = "https://localhost:1001/client/" + id;
    return this.http.delete<Client>(clientDelete);
  }
  
}
