import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Specialization } from '../../../models/specialization';
import { SpecializationService } from '../../../services/specialization.service';

@Component({
  selector: 'app-detail-specialization',
  templateUrl: './detail-specialization.component.html',
  styleUrls: ['./detail-specialization.component.scss']
})
export class DetailSpecializationComponent implements OnInit {

  specializations: Specialization[] = [];
  
  specialization: Specialization = {} as Specialization;

  constructor(private specializationService: SpecializationService, private router: Router, private modalService: NgbModal, private toastrService: NbToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.specialization = this.route.snapshot.data['specialization'];
  }

  deleteSpecializationById(id: string)
  { 
    this.specializationService.deleteSpecializationById(id).subscribe();
  }

  openVerif(verif: any) {
    this.modalService.open(verif, { centered: true })
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/specialization"),1500);
  }
  
  showToast() {
    const config: NbIconConfig = { status: 'danger', icon: 'trash-2-outline', pack: 'eva' };
    var Specializationname = this.specialization.name.toUpperCase();
    this.toastrService.show('Le Specialization ' + Specializationname + ' a été supprimée.', `Spécialisation supprimée`,  config);
  }

}
