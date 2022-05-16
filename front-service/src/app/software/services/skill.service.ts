import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http : HttpClient) { }

  getSkills(): Observable<Skill[]>
  {
    return this.http.get<Skill[]>("https://localhost:9001/skill"); 
  }

  getSkillById(id: any): Observable<Skill>
  {  
    let skillById = "https://localhost:9001/skill/" + id;
    return this.http.get<Skill>(skillById);
  }
}
