import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbIconConfig, NbToastrService } from '@nebular/theme';
import { Client } from '../../../models/client';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {

  project: Project = {} as Project;

  clients: Client[] = [];

  clientsSorted: Client[] = [];

  updateProject!: FormGroup;

  submitted  = false;

  constructor(private projectService: ProjectService, private router: Router, private toastrService: NbToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.project = this.route.snapshot.data['project'];
    this.clients = this.route.snapshot.data['clients'];

    this.clientsSorted = this.clients.sort((a, b) => a.lastname> b.lastname? 1 : -1);
    
    this.updateProject = this.updateFormGroup();

    this.updateProject.patchValue({
      name: this.project.name,
      startdate: new Date(this.project.startdate).toISOString().substring(0,10),
      enddate: new Date(this.project.enddate).toISOString().substring(0,10),
      type: this.project.type,
      clientid: this.project.clientid,
      logo: this.project.logo
    });
  }

  updateFormGroup(): FormGroup {
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
    return this.updateProject.controls;
  }

  updateProjectById(){
    this.submitted = true;
    if (this.updateProject.invalid) {
        return;
    }
    else
    {
      this.updateProject.value.name = this.updateProject.value.name.toUpperCase();
      this.updateProject.value.type = this.updateProject.value.type.charAt(0).toUpperCase() + this.updateProject.value.type.substring(1).toLowerCase();
      this.projectService.updateProjectById(this.project.id, this.updateProject.value).subscribe();
      this.showToast();
      this.redirection(); 
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/project"), 1000);
  }

  showToast() {
    const config: NbIconConfig = { status: 'primary', icon: 'edit-outline', pack: 'eva' };
    var projectname = this.project.name.toUpperCase();
    this.toastrService.show('Le project ' + projectname + ' a bien été modifié.', `Projet mis à jour`, config);
  }
}
