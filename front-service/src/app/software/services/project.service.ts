import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [];
   
  constructor(private route: Router, private http : HttpClient) { }

  getProjects(): Observable<Project[]>
  {
    return this.http.get<Project[]>("https://localhost:3001/project"); 
  }

  getProjectById(id: any): Observable<Project>
  {
    let projectById = "https://localhost:3001/project/" + id;
    return this.http.get<Project>(projectById);
  }

  getProjectByClientId(): Observable<Project[]>
  {
    var stringUrl = this.route.url;
    var id = stringUrl.split('/').pop();  
    return this.http.get<Project[]>("https://localhost:3001/project/client/" + id);
  }

  addProject(project: any): Observable<Project>
  {
  return this.http.post<Project>('https://localhost:3001/project', project);
  }

  updateProjectById(id: string, updateFromData: any): Observable<Project>
  {
    return this.http.put<Project>("https://localhost:3001/project/" + id, updateFromData);
  }

  deleteProjectById(id: string): Observable<Project>{
  let projectDelete = "https://localhost:3001/project/" + id;
  return this.http.delete<Project>(projectDelete);
  }

}
