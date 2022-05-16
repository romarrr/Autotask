import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planning } from '../../../models/planning';
import { User } from '../../../models/user';

@Component({
  selector: 'app-list-planning',
  templateUrl: './list-planning.component.html',
  styleUrls: ['./list-planning.component.scss']
})
export class ListPlanningComponent implements OnInit {

  plannings: Planning[] = [];

  users: User[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.plannings = this.route.snapshot.data['plannings'];
  }

}
