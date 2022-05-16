import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Quote } from '../models/quote';
import { QuoteService } from '../services/quote.service';

@Injectable({
  providedIn: 'root'
})

export class ListQuoteResolver implements Resolve<Observable<Quote[]>> {

  constructor(private quoteService: QuoteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Quote[]> { 
    return this.quoteService.getQuotes();
  }

}
