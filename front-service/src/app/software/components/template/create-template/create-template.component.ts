import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Todo } from '../../../models/todo';
import { TemplateService } from '../../../services/template.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {

  newTemplate!: FormGroup;

  completed!: boolean;

  submitted = false;

  todos: Todo[] = [];

  todosSelected: string[] = [];

  todosSorted: Todo[] = [];
  
  templatetodoid: string[] = [];

  constructor(private router: Router, 
    private templateService: TemplateService, 
    private route: ActivatedRoute, 
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    // Génère le formulaire à l'initialisation du component
    this.todos = this.route.snapshot.data['todos'];
    this.todosSorted = this.todos.sort((a, b) => a.name> b.name? 1 : -1);
    this.newTemplate = this.createFormGroup();
  }

  // Pour génerer mon formulaire, validators permet de rendre la saisie d'un champ
  // obligatoire, pour chaque proprieté
  createFormGroup(): FormGroup {
    return new FormGroup ({
      name: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required]),
      time: new FormControl("",[Validators.required]),
      templatetodoid: new FormControl("",[Validators.required]),
      logo: new FormControl("")
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.newTemplate.controls;
  }
  
  post(){
    this.submitted = true;
    if (this.newTemplate.invalid) {
        return;
    }
    else
    {
      for(var i=0; i<this.todosSelected.length; i++)
      {
        this.templatetodoid.push(this.todosSelected[i]);
      }
      this.newTemplate.value.name = this.newTemplate.value.name.toUpperCase();
      this.newTemplate.value.templatetodoid = this.templatetodoid;
      this.templateService.addTemplate(this.newTemplate.value).subscribe();
      this.showToast('success');
      this.redirection();
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/template"), 2000);
  }

  showToast(status: NbComponentStatus) {
    var templateName = this.newTemplate.value.name.toUpperCase();
    this.toastrService.show('Le modèle ' + templateName + ' a été ajouté.', `Modèle ajouté`, { status });
  }

}
