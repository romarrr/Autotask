import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { Project } from '../../models/project';
import { Template } from '../../models/template';
import { Todo } from '../../models/todo';
import { User } from '../../models/user';
import { ProjectService } from '../../services/project.service';
import { TemplateService } from '../../services/template.service';
import { TodoService } from '../../services/todo.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clients: Client[] = [];
  projects: Project[] = [];
  templates: Template[] = [];
  todos: Todo[] = [];
  users: User[] = [];
  
  constructor(
    private clientService: ClientService, 
    private projectService : ProjectService, 
    private templateService: TemplateService, 
    private todoService: TodoService, 
    private userService: UserService,
    private route: ActivatedRoute) 
  {
    this.clients = this.route.snapshot.data['home'][0];
    this.projects = this.route.snapshot.data['home'][1];
    this.templates = this.route.snapshot.data['home'][2];
    this.todos = this.route.snapshot.data['home'][3];
    this.users = this.route.snapshot.data['home'][4];
  }

  ngOnInit(): void {
    // this.clientService.getClients().subscribe(c => this.clients = c);
    // this.projectService.getProjects().subscribe(p => this.projects = p);
    // this.templateService.getTemplates().subscribe(t => this.templates = t);
    // this.todoService.getTodos().subscribe(t => this.todos = t);
    // this.userService.getUsers().subscribe(u => this.users = u);
    console.log("ATTENTION !!!!!!!");
    console.log(this.route.snapshot.data);
    this.route.snapshot.data['home'];

  }

}
