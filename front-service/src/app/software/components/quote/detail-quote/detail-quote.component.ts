import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../../models/client';
import { Quote } from '../../../models/quote';
import { Template } from '../../../models/template';
import { QuoteService } from '../../../services/quote.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Todo } from 'src/app/software/models/todo';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-detail-quote',
  templateUrl: './detail-quote.component.html',
  styleUrls: ['./detail-quote.component.scss']
})
export class DetailQuoteComponent implements OnInit, AfterViewInit {

  quote: Quote = {} as Quote;
  client: Client = {} as Client;
  template: Template = {} as Template;
  
  displayedColumns: string[] = ['name', 'time'];
  @ViewChild('todos') paginator!: MatPaginator;
  @ViewChild('todosSort') todosSort = new MatSort;
  dataSource!: MatTableDataSource<Todo>;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.quote.todos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.todosSort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  constructor(
    private quoteService: QuoteService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private modalService: NgbModal, 
    private toastrService: NbToastrService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.quote = this.route.snapshot.data['quote']; 
    this.client = this.route.snapshot.data['client']; 
    this.template = this.route.snapshot.data['template']; 
  }

  validQuoteById(id: string)
  {
    this.quoteService.validQuoteById(id, this.quote).subscribe();
  }

  deleteQuoteById(id: string)
  {
    this.quoteService.deleteQuoteById(id).subscribe(); 
  }

  openVerif(verif: any) {
    this.modalService.open(verif, { centered: true })
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/quote"),1000);
  }
  
  showDeleteQuoteToast() {
    const config: NbIconConfig = { status: 'danger', icon: 'trash-2-outline', pack: 'eva' };
    var quotename = this.quote.name.toUpperCase();
    this.toastrService.show('Le devis ' + quotename + ' a été supprimé.', `Devis supprimé`,  config);
  }

  showValidQuoteToast() {
    const config: NbIconConfig = { status: 'success', icon: 'checkmark-outline', pack: 'eva' };
    var quotename = this.quote.name.toUpperCase();
    this.toastrService.show('Le devis ' + quotename + ' a été validé.', `Devis validé`,  config);
  }

}
