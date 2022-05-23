import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../models/client';
import { Project } from '../../../models/project';
import { Template } from '../../../models/template';
import { Todo } from '../../../models/todo';
import { User } from '../../../models/user';

@Component({
  selector: 'app-home-administrator',
  templateUrl: './home-administrator.component.html',
  styleUrls: ['./home-administrator.component.scss']
})
export class HomeAdministratorComponent implements OnInit {

  clients: Client[] = [];
  projects: Project[] = [];
  templates: Template[] = [];
  todos: Todo[] = [];
  users: User[] = [];
  
  constructor(
    private route: ActivatedRoute
  ) 
  {
    this.clients = this.route.snapshot.data['home'][0];
    this.projects = this.route.snapshot.data['home'][1];
    this.templates = this.route.snapshot.data['home'][2];
    this.todos = this.route.snapshot.data['home'][3];
    this.users = this.route.snapshot.data['home'][4];
  }

  ngOnInit(): void {
    this.route.snapshot.data['home'];
  }

}
