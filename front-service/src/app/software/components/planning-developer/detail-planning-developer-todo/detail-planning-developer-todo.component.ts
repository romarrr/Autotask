import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanningTodo } from '../../../models/planningtodo';
import { PlanningDeveloperService } from 'src/app/software/services/planning-developer.service';
import { Planning } from 'src/app/software/models/planning';
import { PlanningService } from 'src/app/software/services/planning.service';
import { User } from 'src/app/software/models/user';
import { UserService } from 'src/app/software/services/user.service';

@Component({
  selector: 'app-detail-planning-developer-todo',
  templateUrl: './detail-planning-developer-todo.component.html',
  styleUrls: ['./detail-planning-developer-todo.component.scss']
})
export class DetailPlanningDeveloperTodoComponent implements OnInit {

  planningDeveloperTodo: PlanningTodo = {} as PlanningTodo;

  planning: Planning = {} as Planning;

  plannings: Planning[] = [];

  planningId!: string;

  updatePlanning!: FormGroup;

  user: User = {} as User;

  userId!: string;

  constructor(
    private planningDeveloperService: PlanningDeveloperService,
    private modalService: NgbModal, 
    private toastrService: NbToastrService,
    private router: Router, 
    private route: ActivatedRoute,
    private planningService: PlanningService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.planningService.getPlannings().subscribe(c => this.plannings = c);
    this.planningDeveloperTodo = this.route.snapshot.data['planningdevelopertodo'];
    this.planningId = this.route.snapshot.params["planningid"];
    this.getUser();
    this.getPlanning();
  }

  getUser()
  {
    this.userId = this.route.snapshot.params['userid'];
    this.userService.getUserById(this.userId).subscribe(u => this.user = u);
  }

  getPlanning()
  {
    this.planningId = this.route.snapshot.params['planningid'];
    this.planningService.getPlanningById(this.planningId).subscribe(u => this.planning = u);
  }

  startTodoById()
  {
    this.planningDeveloperService.startTodoById(this.planningId, this.userId, this.planningDeveloperTodo.id, this.planning).subscribe();
    this.redirection();
  }

  finishTodoById()
  {
    this.planningDeveloperService.finishTodoById(this.planningId, this.userId, this.planningDeveloperTodo.id, this.planning).subscribe();
    this.redirection();
  }

  openVerif(verif: any) {
    this.modalService.open(verif, { centered: true })
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/developer/" + this.planningId + "/user/" + this.planningDeveloperTodo.userid + "/todos"),1000);
  }
  
  showToast() {
    const config: NbIconConfig = { status: 'danger', icon: 'trash-2-outline', pack: 'eva' };
    var todoname = this.planningDeveloperTodo.name.toUpperCase();
    this.toastrService.show('La tâche ' + todoname + ' a été supprimée.', `Tâche supprimée`,  config);
  }

}
