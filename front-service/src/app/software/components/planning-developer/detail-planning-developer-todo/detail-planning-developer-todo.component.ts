import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../../models/todo';

@Component({
  selector: 'app-detail-planning-developer-todo',
  templateUrl: './detail-planning-developer-todo.component.html',
  styleUrls: ['./detail-planning-developer-todo.component.scss']
})
export class DetailPlanningDeveloperTodoComponent implements OnInit {

  todo: Todo = {} as Todo;

  constructor(
    private modalService: NgbModal, 
    private toastrService: NbToastrService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.todo = this.route.snapshot.data['todo'];
  }

  openVerif(verif: any) {
    this.modalService.open(verif, { centered: true })
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/todo"),1000);
  }
  
  showToast() {
    const config: NbIconConfig = { status: 'danger', icon: 'trash-2-outline', pack: 'eva' };
    var todoname = this.todo.name.toUpperCase();
    this.toastrService.show('La tâche ' + todoname + ' a été supprimée.', `Tâche supprimée`,  config);
  }

}
