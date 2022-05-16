import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from '../../../models/skill';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  user: User = {} as User;

  constructor(private userService: UserService, private router: Router, private modalService: NgbModal, private toastrService: NbToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.user.phone = this.user.phone.replace(/(.{2})/g,"$1 ");
  }

  deleteUserById(id: string)
  {
    this.userService.deleteUserById(id).subscribe(); 
  }

  openVerif(verif: any) {
    this.modalService.open(verif, { centered: true })
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/user"),1000);
  }
  
  showToast() {
    const config: NbIconConfig = { status: 'danger', icon: 'trash-2-outline', pack: 'eva' };
    var userlastname = this.user.lastname.toUpperCase();
    var userfirstname = this.user.firstname.charAt(0).toUpperCase() + this.user.firstname.substring(1).toLowerCase();
    this.toastrService.show('L\'utilisateur ' + userlastname + ' ' + userfirstname + ' a été supprimé.', `Utilisateur supprimé`, config);
  }

}
