import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo';
import { PlanningDeveloperService } from '../services/planning-developer.service';

@Injectable({
  providedIn: 'root'
})

export class ListPlanningDeveloperTodoResolver implements Resolve<Observable<Todo[]>> {
  
  constructor(private planningDeveloperService: PlanningDeveloperService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Todo[]> { 
    let planningId: any = route.params['planningid'];
    let userid: any = route.params['userid'];
    return this.planningDeveloperService.getTodosByPlanningIdAndByUserId(planningId, userid);
  }

}
