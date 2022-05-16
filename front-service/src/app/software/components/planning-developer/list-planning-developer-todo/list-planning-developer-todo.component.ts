import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../../../models/todo';
import { User } from '../../../models/user';

@Component({
  selector: 'app-list-planning-developer-todo',
  templateUrl: './list-planning-developer-todo.component.html',
  styleUrls: ['./list-planning-developer-todo.component.scss']
})
export class ListPlanningDeveloperTodoComponent implements OnInit {

  planningDeveloperTodos: Todo[] = [];

  planningDeveloperTodosSorted: Todo[] = [];

  user: User = {} as User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.planningDeveloperTodos = this.route.snapshot.data['planningdevelopertodos'];
    this.planningDeveloperTodosSorted = this.planningDeveloperTodos.sort((a, b) => a.name> b.name? 1 : -1);
    this.user = this.route.snapshot.data['user'];
  }

}
