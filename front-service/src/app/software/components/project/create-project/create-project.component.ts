import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Client } from '../../../models/client';
import { ProjectService } from '../../../services/project.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import localeFr from '@angular/common/locales/fr';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'fr'}]
})
export class CreateProjectComponent implements OnInit {

  newProject!: FormGroup;

  submitted = false;

  clients: Client[] = [];

  clientsSorted: Client[] = [];

  constructor(private router: Router, private projectService: ProjectService, private route: ActivatedRoute, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.clients = this.route.snapshot.data['clients'];
    this.clientsSorted = this.clients.sort((a, b) => a.lastname> b.lastname? 1 : -1);
    this.newProject = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup ({
      name: new FormControl("",[Validators.required]),
      startdate: new FormControl("",[Validators.required]),
      enddate: new FormControl("",[Validators.required]),
      type: new FormControl("",[Validators.required]),
      clientid: new FormControl("",[Validators.required]),
      logo: new FormControl("")
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.newProject.controls;
  }
getDate()
{ 
  console.log("value1 : " + this.newProject.value.enddate);
  console.log("value4 : " + new Date(this.newProject.value.enddate).toISOString().substring(0,10));
  console.log("value5 : " + new Date(this.newProject.value.enddate).toISOString().substring(0,5));
  console.log("value6 : " + new Date(this.newProject.value.enddate).toISOString());
  console.log("value7 : " + new Date(this.newProject.value.enddate).toLocaleDateString());
  console.log("value8 : " + new Date(this.newProject.value.enddate).toLocaleDateString("fr-FR"));
  console.log("value9 : " + new Date(this.newProject.value.enddate).toLocaleTimeString());
  console.log("value10 : " + new Date(this.newProject.value.enddate).toLocaleTimeString("fr-FR"));
  console.log("value11 : " + new Date(this.newProject.value.enddate).toLocaleString());
  console.log("value12 : " + new Date(this.newProject.value.enddate).toLocaleString("fr-FR"));
  console.log("value13 : " + new Date(this.newProject.value.enddate).toISOString().toLocaleString());
  console.log("value14 : " + new Date(this.newProject.value.enddate).toISOString());
}
  post(){
    this.submitted = true;
    if (this.newProject.invalid) {
        return;
    }
    else
    {
      // this.newProject.value.enddate = new Date(this.newProject.value.enddate).toLocaleString("fr-FR");
      // this.newProject.value.enddate = this.newProject.value.enddate.toString();
      this.newProject.value.name = this.newProject.value.name.toUpperCase();
      this.newProject.value.type = this.newProject.value.type.charAt(0).toUpperCase() + this.newProject.value.type.substring(1).toLowerCase();
      this.projectService.addProject(this.newProject.value).subscribe();
      this.showToast('success');
      this.redirection();
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/project"), 1000);
  }

  showToast(status: NbComponentStatus) {
    var projectname = this.newProject.value.name.toUpperCase();
    this.toastrService.show('Le projet ' + projectname + ' a été ajouté.', `Projet ajouté`, { status });
  }
}  
