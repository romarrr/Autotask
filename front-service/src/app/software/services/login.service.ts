import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string)
  {
    return this.http.get<User>("https://localhost:8001/user/email/" + email);
  } 
}
