import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../../models/client';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss']
})
export class DetailProjectComponent implements OnInit {
 
  project: Project = {} as Project;

  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute, private modalService: NgbModal, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.project = this.route.snapshot.data['project']; 
  }

  deleteProjectById(id: string)
  {
    this.projectService.deleteProjectById(id).subscribe(); 
  }

  openVerif(verif: any) {
    this.modalService.open(verif, { centered: true })
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/project"),1000);
  }
  
  showToast() {
    const config: NbIconConfig = { status: 'danger', icon: 'trash-2-outline', pack: 'eva' };
    var projectname = this.project.name.toUpperCase();
    this.toastrService.show('Le projet ' + projectname + ' a été supprimé.', `Projet supprimé`,  config);
  }

}
