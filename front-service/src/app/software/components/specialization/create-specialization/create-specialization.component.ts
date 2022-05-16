import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { SpecializationService } from '../../../services/specialization.service';

@Component({
  selector: 'app-create-specialization',
  templateUrl: './create-specialization.component.html',
  styleUrls: ['./create-specialization.component.scss']
})
export class CreateSpecializationComponent implements OnInit {

  newSpecialization!: FormGroup;
 
  submitted = false;

  constructor(private router: Router, private specializationService: SpecializationService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.newSpecialization = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup ({
      name: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required]),
      logo: new FormControl("")
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.newSpecialization.controls;
  }

  post(){
    this.submitted = true;
    if (this.newSpecialization.invalid) {
        return;
    }
    else
    {
      this.newSpecialization.value.name = this.newSpecialization.value.name.toUpperCase();
      this.specializationService.addSpecialization(this.newSpecialization.value).subscribe();
      this.showToast('success');
      this.redirection(); 
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/specialization"), 1000);
  }

  showToast(status: NbComponentStatus) {
    var specializationname = this.newSpecialization.value.name.toUpperCase();
    this.toastrService.show('La spécialisation ' + specializationname + ' a été ajoutée.', `Spécialisation ajouté`, { status });
  }

}
