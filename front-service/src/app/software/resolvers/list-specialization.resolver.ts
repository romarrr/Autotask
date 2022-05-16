import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Specialization } from '../models/specialization';
import { SpecializationService } from '../services/specialization.service';

@Injectable({
  providedIn: 'root'
})

export class ListSpecializationResolver implements Resolve<Observable<Specialization[]>> {

  constructor(private specializationService: SpecializationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Specialization[]> { 
    return this.specializationService.getSpecializations();
  }

}