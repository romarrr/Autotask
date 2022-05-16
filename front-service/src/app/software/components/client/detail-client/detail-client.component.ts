import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../../models/client';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent implements OnInit {

  
  clients: Client[] = [];
  
  client: Client = {} as Client;

  projects: Project[] = [];

  constructor(private clientService: ClientService, private projectService: ProjectService, private router: Router, private modalService: NgbModal, private toastrService: NbToastrService, private route: ActivatedRoute)
  {
    this.projectService.getProjectByClientId().subscribe((u => this.projects = u));
  }

  ngOnInit(): void {
    this.client = this.route.snapshot.data['client'];
    this.client.phone = this.client.phone.replace(/(.{2})/g,"$1 ");
  }

  deleteClientById(id: string)
  { 
    this.clientService.deleteClientById(id).subscribe();
  }

  openVerif(verif: any) {
    this.modalService.open(verif, { centered: true })
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/client"),1000);
  }
  
  showToast() {
    const config: NbIconConfig = { status: 'danger', icon: 'trash-2-outline', pack: 'eva' };
    var clientlastname = this.client.lastname.toUpperCase();
    var clientfirstname = this.client.firstname.charAt(0).toUpperCase() + this.client.firstname.substring(1).toLowerCase();
    this.toastrService.show('Le client ' + clientlastname + ' ' + clientfirstname + ' a été supprimé.', `Client supprimé`,  config);
  }

}
