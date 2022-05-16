import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Injectable({
  providedIn: 'root'
})

export class ListTodoResolver implements Resolve<Observable<Todo[]>> {
  
  constructor(private todoService: TodoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Todo[]> { 
    return this.todoService.getTodos();
  }

}
