import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Specialization } from '../models/specialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private route: Router, private http : HttpClient) {}

  getSpecializations(): Observable<Specialization[]>
  {
    return this.http.get<Specialization[]>("https://localhost:5001/specialization"); 
  }

  getSpecializationById(id: any): Observable<Specialization>
  {
    let SpecializationById = "https://localhost:5001/specialization/" + id;
    return this.http.get<Specialization>(SpecializationById);
  }

  addSpecialization(Specialization: any): Observable<Specialization>
  {
    return this.http.post<Specialization>('https://localhost:5001/specialization', Specialization);
  }

  updateSpecializationById(id: any, updateFromData: any): Observable<Specialization>
  {
    return this.http.put<Specialization>("https://localhost:5001/specialization/" + id, updateFromData);
  }

  deleteSpecializationById(id: string): Observable<Specialization>{
    let specializationDelete = "https://localhost:5001/specialization/" + id;
    return this.http.delete<Specialization>(specializationDelete);
  }

}
