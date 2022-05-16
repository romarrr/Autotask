import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';

@Injectable({
  providedIn: 'root'
})

export class ListClientResolver implements Resolve<Observable<Client[]>> {

  constructor(private clientService: ClientService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client[]> { 
    return this.clientService.getClients();
  }

}
