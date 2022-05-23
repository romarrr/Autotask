import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Planning } from 'src/app/software/models/planning';
import { UserService } from 'src/app/software/services/user.service';
import { Todo } from '../../../models/todo';
import { User } from '../../../models/user';

@Component({
  selector: 'app-list-planning-developer-todo',
  templateUrl: './list-planning-developer-todo.component.html',
  styleUrls: ['./list-planning-developer-todo.component.scss']
})
export class ListPlanningDeveloperTodoComponent implements OnInit {

  plannings: Planning[] = [];

  planningId!: string;

  planningDeveloperTodos: Todo[] = [];

  planningDeveloperTodosSorted: Todo[] = [];

  user: User = {} as User;

  userId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.planningDeveloperTodos = this.route.snapshot.data['planningdevelopertodos'];
    this.planningDeveloperTodosSorted = this.planningDeveloperTodos.sort((a, b) => a.name> b.name? 1 : -1);
    this.getUser();
    this.planningId = this.route.snapshot.params['planningid'];
  }

  getUser()
  {
    this.userId = this.route.snapshot.params['userid'];
    this.userService.getUserById(this.userId).subscribe(u => this.user = u);
  }
}
