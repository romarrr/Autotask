import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quote } from '../../../models/quote';

@Component({
  selector: 'app-list-quote',
  templateUrl: './list-quote.component.html',
  styleUrls: ['./list-quote.component.scss']
})
export class ListQuoteComponent implements OnInit {

  quotes: Quote[] = [];

  searchTerm!: string;
  
  constructor(private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.quotes = this.route.snapshot.data['quotes'];
  }

}
