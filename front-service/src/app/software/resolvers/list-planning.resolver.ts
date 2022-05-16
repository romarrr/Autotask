import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Planning } from '../models/planning';
import { PlanningService } from '../services/planning.service';

@Injectable({
  providedIn: 'root'
})

export class ListPlanningResolver implements Resolve<Observable<Planning[]>> {

  constructor(private planningService: PlanningService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Planning[]> { 
    return this.planningService.getPlannings();
  }

}
