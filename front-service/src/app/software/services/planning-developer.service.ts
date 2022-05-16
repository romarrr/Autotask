import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class PlanningDeveloperService {

  constructor(private http: HttpClient) { }

  getTodosByUserId(id: string): Observable<Todo[]>
  { 
    return this.http.get<Todo[]>("https://localhost:2001/planning/PlanningDev/todos/user/" + id);
  }

  getTodoById(id: string): Observable<Todo>
  { 
    let todoById = "https://localhost:2001/planning/PlanningDev/todo/" + id;
    return this.http.get<Todo>(todoById);
  }
}
