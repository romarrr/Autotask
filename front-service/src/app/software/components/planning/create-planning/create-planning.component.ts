import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { PlanningService } from 'src/app/software/services/planning.service';

@Component({
  selector: 'app-create-planning',
  templateUrl: './create-planning.component.html',
  styleUrls: ['./create-planning.component.scss']
})
export class CreatePlanningComponent implements OnInit {

  newPlanning!: FormGroup;

  submitted = false;

  roles = ["Développeur", "Commerical", "Administrateur"];

  constructor(private router: Router, 
    private planningService: PlanningService, 
    private route: ActivatedRoute, 
    private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.newPlanning = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup ({
      name: new FormControl("",[Validators.required]),
      role: new FormControl("",[Validators.required]),
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.newPlanning.controls;
  }

  post(){
    this.submitted = true;
    if (this.newPlanning.invalid) {
        return;
    }
    else
    {
      this.newPlanning.value.name = this.newPlanning.value.name.charAt(0).toUpperCase() + this.newPlanning.value.name.substring(1).toLowerCase();
      this.planningService.addPlanning(this.newPlanning.value, this.newPlanning.value.role).subscribe();
      this.showToast('success');
      this.redirection();
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("planning"), 1000);
  }

  showToast(status: NbComponentStatus) {
    var Planningname = this.newPlanning.value.name.toUpperCase();
    this.toastrService.show('Le planning ' + Planningname + ' a été ajouté.', `Planning ajouté`, { status });
  }
}
