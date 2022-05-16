import { Injectable } from '@angular/core';
import { Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';

@Injectable({
  providedIn: 'root'
})

export class DetailClientResolver implements Resolve<Observable<Client>> {

  constructor(private clientService: ClientService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client> {
    let id: any = route.params['id'];
    return this.clientService.getClientById(id);
  }

}
