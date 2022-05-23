import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbIconConfig, NbToastrService } from '@nebular/theme';
import { Skill } from '../../../models/skill';
import { Todo } from '../../../models/todo';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss']
})
export class UpdateTodoComponent implements OnInit {

  todo: Todo = {} as Todo

  updateTodo!: FormGroup;

  skill: Skill = {} as Skill;

  skills: Skill[] = [];

  skillsId: string[] = [];

  skillsSorted: Skill[] = [];

  skillList: Skill[] = [];

  skillsSelected: string[] = [];

  submitted = false;

  types = ["Front", "Back"];

  constructor(private todoService: TodoService, private router: Router, private toastrService: NbToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todo = this.route.snapshot.data['todo'];
    this.skills = this.route.snapshot.data['skills'];
    this.skillsSorted = this.skills.sort((a, b) => a.specializationname> b.specializationname? 1 : -1);
    this.updateTodo = this.updateFormGroup();
    this.updateTodo.patchValue({
      name: this.todo.name,
      type: this.todo.type,
      description: this.todo.description,
      time: this.todo.time,
      skillid: this.todo.skillid,
      logo: this.todo.logo
    });
  }

  updateFormGroup(): FormGroup {
    return new FormGroup ({
      name: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required]),
      type: new FormControl("",[Validators.required]),
      time: new FormControl("",[Validators.required]),
      skillid: new FormControl("",[Validators.required]),
      logo: new FormControl("")
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.updateTodo.controls;
  }

  updateTodoById(){
    this.submitted = true;
    if (this.updateTodo.invalid) {
        return;
    }
    else
    {
      this.updateTodo.value.name = this.updateTodo.value.name.toUpperCase();
      this.todoService.updateTodoById(this.todo.id, this.updateTodo.value).subscribe();
      this.showToast();
      this.redirection(); 
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/todo"), 1000);
  }

  showToast() {
    const config: NbIconConfig = { status: 'primary', icon: 'edit-outline', pack: 'eva' };
    var todoname = this.updateTodo.value.name.charAt(0).toUpperCase() + this.updateTodo.value.name.substring(1).toLowerCase();
    this.toastrService.show('La tâche ' + todoname + ' a bien été modifiée.', `Tâche mise à jour`, config);
  }

}
