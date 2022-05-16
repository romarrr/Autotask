import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Quote } from '../models/quote';
import { QuoteService } from '../services/quote.service';

@Injectable({
  providedIn: 'root'
})

export class DetailQuoteResolver implements Resolve<Observable<Quote>> {
  
  constructor(private quoteService: QuoteService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Quote> {
    let id: any = route.params['id'];
    return this.quoteService.getQuoteById(id);
  }
}