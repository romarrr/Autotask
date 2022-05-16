import { Injectable } from '@angular/core';
import { Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { ClientService } from '../services/client.service';
import { ProjectService } from '../services/project.service';
import { TemplateService } from '../services/template.service';
import { TodoService } from '../services/todo.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<boolean> {

  constructor(
    private clientService: ClientService,
    private projectService: ProjectService,
    private templateService: TemplateService, 
    private todoService: TodoService, 
    private userService: UserService
    ) {}
    
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return forkJoin([
      this.clientService.getClients(),
      this.projectService.getProjects(),
      this.templateService.getTemplates(),
      this.todoService.getTodos(),
      this.userService.getUsers()  
    ])
  }
  
}
