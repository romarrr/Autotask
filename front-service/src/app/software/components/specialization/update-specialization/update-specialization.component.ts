import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbIconConfig, NbToastrService } from '@nebular/theme';
import { Specialization } from '../../../models/specialization';
import { SpecializationService } from '../../../services/specialization.service';

@Component({
  selector: 'app-update-specialization',
  templateUrl: './update-specialization.component.html',
  styleUrls: ['./update-specialization.component.scss']
})
export class UpdateSpecializationComponent implements OnInit {

  specialization: Specialization = {} as Specialization

  updateSpecialization!: FormGroup;

  submitted = false;

  constructor(private specializationService: SpecializationService, private router: Router, private toastrService: NbToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.specialization = this.route.snapshot.data['specialization'];
    this.updateSpecialization = this.updateFormGroup();
    this.updateSpecialization.patchValue({
      name: this.specialization.name,
      description: this.specialization.description,
      logo: this.specialization.logo
    });
  }

  updateFormGroup(): FormGroup {
    return new FormGroup ({
      name: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required]),   
      logo: new FormControl("")
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.updateSpecialization.controls;
  }

  updateSpecializationById(){
    this.submitted = true;
    if (this.updateSpecialization.invalid) {
        return;
    }
    else
    {
      this.updateSpecialization.value.name = this.updateSpecialization.value.name.toUpperCase();
      this.specializationService.updateSpecializationById(this.specialization.id, this.updateSpecialization.value).subscribe();
      this.showToast();
      this.redirection(); 
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/specialization"), 1000);
  }

  showToast() {
    const config: NbIconConfig = { status: 'primary', icon: 'edit-outline', pack: 'eva' };
    var specializationname = this.updateSpecialization.value.name.toUpperCase();
    this.toastrService.show('La spécialisation ' + specializationname + ' a bien été modifiée.', `Spécialisation mise à jour`, config);
  }

}
