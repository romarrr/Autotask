import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Planning } from '../../../models/planning';
import { PlanningService } from '../../../services/planning.service';

@Component({
  selector: 'app-detail-planning',
  templateUrl: './detail-planning.component.html',
  styleUrls: ['./detail-planning.component.scss']
})
export class DetailPlanningComponent implements OnInit {

  planning: Planning = {} as Planning;
  
  constructor(private planningService: PlanningService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private modalService: NgbModal, 
    private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.planning = this.route.snapshot.data['planning'];
  }

  deletePlanningById(id: string)
  {
    this.planningService.deletePlanningById(id).subscribe(); 
  }

  openVerif(verif: any) {
    this.modalService.open(verif, { centered: true });
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/planning"),1000);
  }
  
  showDeletePlanningToast() {
    const config: NbIconConfig = { status: 'danger', icon: 'trash-2-outline', pack: 'eva' };
    var planningname = this.planning.name.toUpperCase();
    this.toastrService.show('Le planning ' + planningname + ' a été supprimé.', `Planning supprimé`,  config);
  }

}
