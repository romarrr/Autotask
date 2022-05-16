import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
   
  constructor(private route: Router, private http : HttpClient) { }

  getQuotes(): Observable<Quote[]>
  {
    return this.http.get<Quote[]>("https://localhost:4001/quote"); 
  }

  getQuoteById(id: any): Observable<Quote>
  {
    let quoteById = "https://localhost:4001/quote/" + id;
    return this.http.get<Quote>(quoteById);
  }

  getQuoteByClientId(): Observable<Quote[]>
  {
    var stringUrl = this.route.url;
    var id = stringUrl.split('/').pop();  
    return this.http.get<Quote[]>("https://localhost:4001/quote/client/" + id);
  }

  addQuote(quote: any): Observable<Quote>
  {
    return this.http.post<Quote>("https://localhost:4001/quote", quote);
  }

  updateQuoteById(id: string, updateFromData: any): Observable<Quote>
  {
    return this.http.put<Quote>("https://localhost:4001/quote/" + id, updateFromData);
  }

  deleteQuoteById(id: string): Observable<Quote>
  {
    let quoteDelete = "https://localhost:4001/quote/" + id;
    return this.http.delete<Quote>(quoteDelete);
  }

  validQuoteById(id: string, updateFromData: any): Observable<Quote>
  {
    return this.http.put<Quote>("https://localhost:4001/quote/valid/" + id, updateFromData);
  }

}
