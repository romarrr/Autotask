import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Skill } from '../../../models/skill';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  newTodo!: FormGroup;

  submitted  = false;

  skills: Skill[] = [];

  skillsId: string[] = [];

  skillsSorted: Skill[] = [];

  skillList: Skill[] = [];

  skillsSelected: string[] = [];

  selected!: string;

  types = ["Front", "Back"];

  constructor(
    private router: Router,
    private todoService: TodoService, 
    private toastrService: NbToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.skills = this.route.snapshot.data['skills'];
    this.skillsSorted = this.skills.sort((a, b) => a.specializationname> b.specializationname? 1 : -1);

    // genere le formulaire a l'initialisation du component
    this.newTodo = this.createFormGroup();
  }

  //Pour génerer mon formulaire, validators permet de rendre la saisie d'un champ
  //obligatoire, pour chaque proprieté
  createFormGroup(): FormGroup {
    return new FormGroup ({
      name: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required]),
      time: new FormControl("",[Validators.required]),
      type: new FormControl("",[Validators.required]),
      skillid: new FormControl("",[Validators.required]),
      logo: new FormControl("")  
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.newTodo.controls;
  }

  post(){
    this.submitted = true;
    if (this.newTodo.invalid) {
        return;
    }
    else
    {
      this.newTodo.value.name = this.newTodo.value.name.toUpperCase();
      this.todoService.addTodo(this.newTodo.value).subscribe();
      this.showToast('success');
      this.redirection();
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/todo"), 2000);
  }

  showToast(status: NbComponentStatus) {
    var todoName = this.newTodo.value.name.toUpperCase();
    this.toastrService.show('La tâche ' + todoName + ' a été ajoutée.', `Tâche ajoutée`, { status });
  }

}
