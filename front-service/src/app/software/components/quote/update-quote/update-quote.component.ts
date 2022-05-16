import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbIconConfig, NbToastrService } from '@nebular/theme';
import { Client } from '../../../models/client';
import { Quote } from '../../../models/quote';
import { Template } from '../../../models/template';
import { Todo } from '../../../models/todo';
import { QuoteService } from '../../../services/quote.service';

@Component({
  selector: 'app-update-quote',
  templateUrl: './update-quote.component.html',
  styleUrls: ['./update-quote.component.scss']
})
export class UpdateQuoteComponent implements OnInit {

  clients: Client[] = [];
  
  quote: Quote = {} as Quote;

  clientsSorted: Client[] = [];

  templates: Template[] = [];
  templateTodoId: string[] = [];
  templatesSorted: Template[] = [];

  todos: Todo[] = [];
  todosIdOutOfTemplate: string[] = [];
  todosInTemplate: Todo[] = [];
  todosSelected: string[] = [];
  todosSorted: Todo[] = [];

  updateQuote!: FormGroup;

  selected!: string;

  submitted = false;

  constructor(
    private quoteService: QuoteService, 
    private router: Router, 
    private toastrService: NbToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clients = this.route.snapshot.data['clients'];
    this.quote = this.route.snapshot.data['quote'];
    this.templates = this.route.snapshot.data['templates'];
    this.todos = this.route.snapshot.data['todos'];
    this.clientsSorted = this.clients.sort((a, b) => a.lastname> b.lastname? 1 : -1);
    this.templatesSorted = this.templates.sort((a, b) => a.name> b.name? 1 : -1);
    this.todosSorted = this.todos.sort((a, b) => a.name> b.name? 1 : -1);
    this.updateQuote = this.updateFormGroup();
    this.updateQuote.patchValue({
      name: this.quote.name,
      templateid: this.quote.templateid,
      templatetodoid: this.quote.templatetodoid,
      todosidoutoftemplate: this.quote.todosidoutoftemplate,
      clientid: this.quote.clientid,
      logo: this.quote.logo,
    });
  }

  updateFormGroup(): FormGroup {
    return new FormGroup ({
      name: new FormControl("",[Validators.required]),
      templateid: new FormControl(""),
      templatetodoid: new FormControl(""),
      todosidoutoftemplate: new FormControl(""),
      clientid: new FormControl("",[Validators.required]),
      logo: new FormControl("")
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.updateQuote.controls;
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

  updateQuoteById(){
    this.submitted = true;
    if (this.updateQuote.invalid) {
        return;
    }
    else
    {
      for(var i=0; i<this.todosSelected.length; i++)
      {
        this.todosIdOutOfTemplate.push(this.todosSelected[i]);
      }
      if(this.updateQuote.value.todosidoutoftemplate != this.quote.todosidoutoftemplate)
      {
        this.updateQuote.value.todosidoutoftemplate = this.todosIdOutOfTemplate;
      }
      if(this.templateTodoId.length == 0)
      { 
        this.updateQuote.value.templatetodoid = this.quote.templatetodoid;
      }
      else
      { 
        this.updateQuote.value.templatetodoid = this.templateTodoId;
      }
      this.updateQuote.value.name = this.updateQuote.value.name.toUpperCase();
      this.quoteService.updateQuoteById(this.quote.id, this.updateQuote.value).subscribe();
      this.showToast();
      this.redirection(); 
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/quote"), 1000);
  }

  showToast() {
    const config: NbIconConfig = { status: 'primary', icon: 'edit-outline', pack: 'eva' };
    var quotename = this.updateQuote.value.name.toUpperCase();
    this.toastrService.show('Le devis ' + quotename + ' a bien été modifié.', `Devis mis à jour`, config);
  }

}
