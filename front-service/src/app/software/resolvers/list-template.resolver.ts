import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Template } from '../models/template';
import { TemplateService } from '../services/template.service';

@Injectable({
  providedIn: 'root'
})

export class ListTemplateResolver implements Resolve<Observable<Template[]>> {

  constructor(private templateService: TemplateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Template[]> { 
    return this.templateService.getTemplates();
  }

}

