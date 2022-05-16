import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbIconConfig, NbToastrService } from '@nebular/theme';
import { Planning } from 'src/app/software/models/planning';
import { PlanningService } from 'src/app/software/services/planning.service';

@Component({
  selector: 'app-update-planning',
  templateUrl: './update-planning.component.html',
  styleUrls: ['./update-planning.component.scss']
})
export class UpdatePlanningComponent implements OnInit {

  planning: Planning = {} as Planning;

  updatePlanning!: FormGroup;

  submitted  = false;

  roles = ["Développeur", "Commerical", "Administrateur"];

  constructor(private planningService: PlanningService, 
    private router: Router, 
    private toastrService: NbToastrService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.planning = this.route.snapshot.data['planning'];
    
    this.updatePlanning = this.updateFormGroup();

    this.updatePlanning.patchValue({
      name: this.planning.name,
      todos: this.planning.todos
    });
  }

  updateFormGroup(): FormGroup {
    return new FormGroup ({
      name: new FormControl("",[Validators.required]),
      role: new FormControl("",[Validators.required])
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.updatePlanning.controls;
  }

  updatePlanningByRoleAndById(){
    this.submitted = true;
    if (this.updatePlanning.invalid) {
        return;
    }
    else
    {
      this.updatePlanning.value.name = this.updatePlanning.value.name.toUpperCase();
      this.planningService.updatePlanningByRoleAndById(this.planning.id, this.updatePlanning.value).subscribe();
      this.showToast();
      this.redirection(); 
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/planning"), 1000);
  }

  showToast() {
    const config: NbIconConfig = { status: 'primary', icon: 'edit-outline', pack: 'eva' };
    var planningName = this.planning.name.toUpperCase();
    this.toastrService.show('Le planning ' + planningName + ' a bien été modifié.', `Planning mis à jour`, config);
  }

}
