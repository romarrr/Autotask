import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class PlanningDeveloperService {

  constructor(private http: HttpClient) { }

  getTodosByPlanningIdAndByUserId(planningId: string, userid: string): Observable<Todo[]>
  { 
    return this.http.get<Todo[]>("https://localhost:2001/planning/" + planningId + "/todos/user/" + userid);
  }

  getTodoByIdByPlanningIdAndByUserId(planningId: string, userid: string, todoid: string): Observable<Todo>
  { 
    let getTodo = "https://localhost:2001/planning/" + planningId + "/todo/user/" + userid + "/" + todoid;
    return this.http.get<Todo>(getTodo);
  }

  startTodoById(planningid: string, userid: string, todoid: string, updateTodo: any): Observable<Todo>
  { 
    return this.http.put<Todo>("https://localhost:2001/planning/" + planningid + "/user/" + userid + "/start/todo/" + todoid, updateTodo);
  }

  finishTodoById(planningid: string, userid: string, todoid: string, updateTodo: any): Observable<Todo>
  { 
    return this.http.put<Todo>("https://localhost:2001/planning/" + planningid + "/user/" + userid + "/finish/todo/" + todoid, updateTodo);
  }
}
