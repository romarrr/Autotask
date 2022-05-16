import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Template } from '../models/template';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  template: Template = {} as Template;
  templates: Template[] = [];

  todos: Todo[] = [];
   
  constructor(private route: Router, private http : HttpClient) { }

  getTemplates(): Observable<Template[]>
  {
    return this.http.get<Template[]>("https://localhost:6001/template"); 
  }

  getTemplateById(id: any): Observable<Template>
  {
    let templateById = "https://localhost:6001/template/" + id;
    return this.http.get<Template>(templateById);
  }

  addTemplate(template: any): Observable<Template>
  {
  return this.http.post<Template>('https://localhost:6001/template', template);
  }

  updateTemplateById(id: string, updateFromData: any): Observable<Template>
  {
    return this.http.put<Template>("https://localhost:6001/template/" + id, updateFromData);
  }

  deleteTemplateById(id: string): Observable<Template>{
  let templateDelete = "https://localhost:6001/template/" + id;
  return this.http.delete<Template>(templateDelete);
  }

}
