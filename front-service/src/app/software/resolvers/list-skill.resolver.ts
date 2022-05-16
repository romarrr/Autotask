import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Skill } from '../models/skill';
import { SkillService } from '../services/skill.service';


@Injectable({
  providedIn: 'root'
})

export class ListSkillResolver implements Resolve<Observable<Skill[]>> {

  constructor(private skillService: SkillService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Skill[]> { 
    return this.skillService.getSkills();
  }

}