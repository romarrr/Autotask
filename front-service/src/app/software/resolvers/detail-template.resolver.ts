import { Injectable } from '@angular/core';
import { Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { Template } from '../models/template';
import { TodoService } from '../services/todo.service';
import { TemplateService } from '../services/template.service';

@Injectable({
  providedIn: 'root'
})

export class DetailTemplateResolver implements Resolve<boolean> {

  constructor(private templateService: TemplateService, private todoService: TodoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id: any = route.params['id'];
    return forkJoin([
      this.templateService.getTemplateById(id),
      this.todoService.getTodos()
    ])
  }

}
