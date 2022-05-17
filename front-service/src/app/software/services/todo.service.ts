import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];
   
  constructor(private http : HttpClient) { }

  getTodos(): Observable<Todo[]>
  {
    return this.http.get<Todo[]>("https://localhost:7001/todo"); 
  }

  getTodoById(id: any): Observable<Todo>
  {  
    let todoById = "https://localhost:7001/todo/" + id;
    return this.http.get<Todo>(todoById);
  }

  addTodo(todo: any): Observable<Todo>
  {
  return this.http.post<Todo>('https://localhost:7001/todo', todo);
  }

  updateTodoById(id: string, updateFromData: any): Observable<Todo>
  {
    return this.http.put<Todo>("https://localhost:7001/todo/" + id, updateFromData);
  }

  deleteTodoById(id: string): Observable<Todo>{
  let todoDelete = "https://localhost:7001/Todo/" + id;
  return this.http.delete<Todo>(todoDelete);
  }

}
