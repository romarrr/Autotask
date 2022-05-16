import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../../../models/todo';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {

  todos: Todo[] = [];

  todosSorted: Todo[] = [];

  searchTerm!: string;

  constructor(
    private myService : TodoService,
    private route: ActivatedRoute)
  { }

  ngOnInit(): void {
    this.todos = this.route.snapshot.data['todos'];
    this.todosSorted = this.todos.sort((a, b) => a.name> b.name? 1 : -1);
  }

}
