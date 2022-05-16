import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Specialization } from '../../../models/specialization';

@Component({
  selector: 'app-list-specialization',
  templateUrl: './list-specialization.component.html',
  styleUrls: ['./list-specialization.component.scss']
})
export class ListSpecializationComponent implements OnInit {

  specializations: Specialization[] = [];

  specializationsSorted: Specialization[] = []

  searchTerm!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.specializations = this.route.snapshot.data['specializations'];
    this.specializationsSorted = this.specializations.sort((a, b) => a.name> b.name? 1 : -1);
  }

}
