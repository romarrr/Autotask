import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Client } from '../../../models/client';
import { Template } from '../../../models/template';
import { Todo } from '../../../models/todo';
import { QuoteService } from '../../../services/quote.service';

@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.component.html',
  styleUrls: ['./create-quote.component.scss']
})
export class CreateQuoteComponent implements OnInit {

  newQuote!: FormGroup;

  submitted = false;

  clients: Client[] = [];
  clientsSorted: Client[] = [];

  templates: Template[] = [];
  templateTodoId: string[] = [];
  templatesSorted: Template[] = [];

  todos: Todo[] = [];
  todosIdOutOfTemplate: string[] = [];
  todosInTemplate: Todo[] = [];
  todosSelected: string[] = [];
  todosSorted: Todo[] = [];

  selected!: string;

  constructor(
    private router: Router, 
    private quoteService: QuoteService, 
    private route: ActivatedRoute, 
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.newQuote = this.createFormGroup();
    this.clients = this.route.snapshot.data['clients'];
    this.templates = this.route.snapshot.data['templates'];
    this.todos = this.route.snapshot.data['todos'];
    this.clientsSorted = this.clients.sort((a, b) => a.lastname> b.lastname? 1 : -1);
    this.templatesSorted = this.templates.sort((a, b) => a.name> b.name? 1 : -1);
    this.todosSorted = this.todos.sort((a, b) => a.name> b.name? 1 : -1);
  }

  createFormGroup(): FormGroup {
    return new FormGroup ({
      name: new FormControl("",[Validators.required]),
      templateid: new FormControl("",[Validators.required]),
      templatetodoid: new FormControl(""),
      todosidoutoftemplate: new FormControl(""),
      clientid: new FormControl("",[Validators.required]),
      logo: new FormControl("")
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.newQuote.controls;
  }

  getTodosFromTemplate() 
  {
    this.templateTodoId = [];
    for(var i=0; i<this.templates.length; i++)
    {
      if(this.templates[i].id == this.selected)
      { 
        this.todosInTemplate = this.templates[i].todos;
        for(var j=0; j<this.todosInTemplate.length; j++)
        {
          this.templateTodoId.push(this.todosInTemplate[j].id);
        } 
      }   
    }
  }

  post(){
    this.submitted = true;
    if (this.newQuote.invalid) {
        return;
    }
    else
    {
      for(var i=0; i<this.todosSelected.length; i++)
      {
        this.todosIdOutOfTemplate.push(this.todosSelected[i]);
      }
      this.newQuote.value.todosidoutoftemplate = this.todosIdOutOfTemplate;
      this.newQuote.value.templatetodoid = this.templateTodoId;
      this.quoteService.addQuote(this.newQuote.value).subscribe();
      this.showToast('success');
      this.redirection();
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/quote"), 2000);
  }

  showToast(status: NbComponentStatus) {
    var Quotename = this.newQuote.value.name.toUpperCase();
    this.toastrService.show('Le devis ' + Quotename + ' a été ajouté.', `Devis ajouté`, { status });
  }

}
