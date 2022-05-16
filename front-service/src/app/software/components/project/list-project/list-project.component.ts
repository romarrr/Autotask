import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit {

  projects: Project[] = [];

  projectsSorted: Project[] = [];

  searchTerm!: string;
  
  constructor(private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.projects = this.route.snapshot.data['projects'];
    this.projectsSorted = this.projects.sort((a, b) => a.name> b.name? 1 : -1);
  }

}
