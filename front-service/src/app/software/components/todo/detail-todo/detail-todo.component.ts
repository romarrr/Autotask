import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, Router, Event, ActivatedRoute } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../../models/todo';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-detail-todo',
  templateUrl: './detail-todo.component.html',
  styleUrls: ['./detail-todo.component.scss']
})
export class DetailTodoComponent implements OnInit {

  //represente ma liste de Todos
  todos: Todo[] = [];
  //represente un objet Todo
  todo: Todo = {} as Todo;

  constructor(
    private todoService: TodoService,
    private modalService: NgbModal, 
    private toastrService: NbToastrService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.todo = this.route.snapshot.data['todo'];
  }

  deleteTodoById(id: string)
  {
    this.todoService.deleteTodoById(id).subscribe();
    this.router.navigateByUrl("/todo");
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
