import { Injectable } from '@angular/core';
import { Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Specialization } from '../models/specialization';
import { SpecializationService } from '../services/specialization.service';

@Injectable({
  providedIn: 'root'
})

export class DetailSpecializationResolver implements Resolve<Observable<Specialization>> {

  constructor(private specializationService: SpecializationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Specialization> {
    let id: any = route.params['id'];
    return this.specializationService.getSpecializationById(id);
  }

}