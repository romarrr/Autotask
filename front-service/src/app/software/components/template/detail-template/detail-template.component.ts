import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, NavigationError, Router ,Event, ActivatedRoute} from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Template } from '../../../models/template';
import { Todo } from '../../../models/todo';
import { TemplateService } from '../../../services/template.service';

@Component({
  selector: 'app-detail-template',
  templateUrl: './detail-template.component.html',
  styleUrls: ['./detail-template.component.scss']
})
export class DetailTemplateComponent implements OnInit {

  template: Template = {} as Template;

  todosSorted: Todo[] = [];

  displayedColumns: string[] = ['name', 'time'];
  @ViewChild('todos') paginator!: MatPaginator;
  @ViewChild('todosSort') todosSort = new MatSort;
  dataSource!: MatTableDataSource<Todo>;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.template.todos);
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
    private templateService: TemplateService, 
    private modalService: NgbModal, 
    private toastrService: NbToastrService,
    private router: Router, 
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.template = this.route.snapshot.data['template'][0];

    this.todosSorted = this.template.todos.sort((a, b) => a.name> b.name? 1 : -1);
  }

  deleteTemplateById(id: string)
  {
    this.templateService.deleteTemplateById(id).subscribe();
    this.router.navigateByUrl("/template");
  }

  openVerif(verif: any) {
    this.modalService.open(verif, { centered: true })
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/template"),1000);
  }
  
  showToast() {
    const config: NbIconConfig = { status: 'danger', icon: 'trash-2-outline', pack: 'eva' };
    var templatename = this.template.name.toUpperCase();
    this.toastrService.show('Le modèle ' + templatename + ' a été supprimé.', `Modèle supprimé`,  config);
  }

}
