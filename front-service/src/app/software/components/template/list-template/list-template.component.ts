import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Template } from '../../../models/template';
import { Todo } from '../../../models/todo';
import { TemplateService } from '../../../services/template.service';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.scss']
})
export class ListTemplateComponent implements OnInit {

  templates: Template[] = [];

  templatesSorted: Template[] = [];

  todos: Todo[] = [];

  searchTerm!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.templates = this.route.snapshot.data['templates'];
    this.templatesSorted = this.templates.sort((a, b) => a.name> b.name? 1 : -1);
  }

}
