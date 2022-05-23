import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Planning } from '../models/planning';
import { PlanningTodo } from '../models/planningtodo';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private router: Router, private http: HttpClient) { }

  getPlannings(): Observable<Planning[]>
  {
    return this.http.get<Planning[]>("https://localhost:2001/planning"); 
  }

  getPlanningById(id: any): Observable<Planning>
  {
    let planningById = "https://localhost:2001/planning/" + id;
    return this.http.get<Planning>(planningById);
  }

  getPlanningByUserId(): Observable<Planning[]>
  {
    var stringUrl = this.router.url;
    var id = stringUrl.split('/').pop();  
    return this.http.get<Planning[]>("https://localhost:2001/planning/user/" + id);
  }

  addPlanning(planning: any, role: any): Observable<Planning>
  {
    return this.http.post<Planning>("https://localhost:2001/planning/" + role, planning);
  }

  updatePlanningByRoleAndById(id: string, updateFromData: any): Observable<Planning>
  {
    return this.http.put<Planning>("https://localhost:2001/planning/" + id, updateFromData);
  }
  
  deletePlanningById(id: string): Observable<Planning>
  {
    let planningDelete = "https://localhost:2001/planning/" + id;
    return this.http.delete<Planning>(planningDelete);
  }

  getTodosPlanningByUserId(id: string, name: string): Observable<PlanningTodo[]>
  {
    return this.http.get<PlanningTodo[]>("https://localhost:2001/planning/" + name + "/todos/user/" + id);
  }
}
