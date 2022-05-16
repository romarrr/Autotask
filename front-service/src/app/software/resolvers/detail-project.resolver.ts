import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Injectable({
  providedIn: 'root'
})

export class DetailProjectResolver implements Resolve<Observable<Project>> {
  
  constructor(private projectService: ProjectService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> {
    let id: any = route.params['id'];
    return this.projectService.getProjectById(id);
  }
}
