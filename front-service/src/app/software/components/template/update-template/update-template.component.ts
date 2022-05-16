import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbIconConfig, NbToastrService } from '@nebular/theme';
import { Template } from '../../../models/template';
import { Todo } from '../../../models/todo';
import { TemplateService } from '../../../services/template.service';

@Component({
  selector: 'app-update-template',
  templateUrl: './update-template.component.html',
  styleUrls: ['./update-template.component.scss']
})
export class UpdateTemplateComponent implements OnInit {

  updateTemplate!: FormGroup;

  template: Template = {} as Template;
  templateTodoId: string[] = [];

  todos: Todo[] = [];
  todosSelected: string[] = [];
  todosSorted: Todo[] = [];

  submitted  = false;

  constructor(private templateService: TemplateService, private router: Router, private toastrService: NbToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.template = this.route.snapshot.data['template'][0];
    this.todos = this.route.snapshot.data['template'][1];
    this.todosSorted = this.todos.sort((a, b) => a.name> b.name? 1 : -1);
    this.updateTemplate = this.updateFormGroup();
    this.updateTemplate.patchValue({
      name: this.template.name,
      description: this.template.description,
      time: this.template.time,
      templatetodoid: this.template.templatetodoid,
      logo: this.template.logo
    });
  }

  updateFormGroup(): FormGroup {
    return new FormGroup ({
      name: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required]),
      time: new FormControl("",[Validators.required]),
      templatetodoid: new FormControl("",[Validators.required]),
      logo: new FormControl("")
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.updateTemplate.controls;
  }

  update()
  {
    this.submitted = true;
    if (this.updateTemplate.invalid) {
        return;
    }
    else
    {
      for(var i=0; i<this.todosSelected.length; i++)
      {
        this.templateTodoId.push(this.todosSelected[i]);
      }
      if(this.templateTodoId.length == 0)
      { 
        this.updateTemplate.value.templatetodoid = this.template.templatetodoid;
      }
      else
      { 
        this.updateTemplate.value.templatetodoid = this.templateTodoId;
      }
      this.updateTemplate.value.name = this.updateTemplate.value.name.toUpperCase();
      this.templateService.updateTemplateById(this.template.id, this.updateTemplate.value).subscribe();
      this.showToast();
      this.redirection(); 
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/template"), 2000);
  }

  showToast() {
    const config: NbIconConfig = { status: 'primary', icon: 'edit-outline', pack: 'eva' };
    var templatename = this.updateTemplate.value.name.toUpperCase();
    this.toastrService.show('Le modèle ' + templatename + ' a bien été modifié.', `Modèle mis à jour`, config);
  }
}
