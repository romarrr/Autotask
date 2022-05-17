import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = []
   
  constructor(private http : HttpClient) {}

  getUsers(): Observable<User[]>
  {
    return this.http.get<User[]>("https://localhost:8001/user"); 
  }

  getUserById(id: any): Observable<User>
  {
    let userById = "https://localhost:8001/user/" + id;
    return this.http.get<User>(userById);
  }

  addUser(User: any): Observable<User>
  {
  return this.http.post<User>('https://localhost:8001/user', User);
  }

  updateUserById(id: string, updateFromData: any): Observable<User>
  {
    return this.http.put<User>("https://localhost:8001/user/" + id, updateFromData);
  }

  deleteUserById(id: string): Observable<User>{
  let userDelete = "https://localhost:8001/user/" + id;
  return this.http.delete<User>(userDelete);
  }
  
}
