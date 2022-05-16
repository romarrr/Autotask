import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbIconConfig, NbToastrService } from '@nebular/theme';
import { Skill } from '../../../models/skill';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  roles = ["Administrateur", "Commercial", "Développeur"];

  user: User = {} as User

  updateUser!: FormGroup;

  skills: Skill[] = [];
  skillsId: string[] = [];
  skillsSelected: string[] = [];
  skillsSorted: Skill[] = [];

  submitted = false;

  constructor(
    private userService: UserService, 
    private router: Router, 
    private toastrService: NbToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.skills = this.route.snapshot.data['skills'];
    this.skillsSorted = this.skills.sort((a, b) => a.specializationname> b.specializationname? 1 : -1);
    this.updateUser = this.updateFormGroup();
    this.updateUser.patchValue({
      role: this.user.role,
      lastname: this.user.lastname,
      firstname: this.user.firstname,
      address: this.user.address,
      town: this.user.town,
      postalcode: this.user.postalcode,
      phone: this.user.phone,
      email: this.user.email,
      skillsid: this.user.skillsid,
      password: this.user.password,
      photo: this.user.photo
    });
  }

  updateFormGroup(): FormGroup {
    return new FormGroup ({
      role: new FormControl("",[Validators.required]),
      lastname: new FormControl("",[Validators.required]),
      firstname: new FormControl("",[Validators.required]),
      address: new FormControl("",[Validators.required]),
      postalcode: new FormControl("",[Validators.required]),
      town: new FormControl("",[Validators.required]),
      phone: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]), 
      skillsid: new FormControl("",[Validators.required]),   
      photo: new FormControl("")
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.updateUser.controls;
  }

  updateUserById()
  {
    this.submitted = true;
    if (this.updateUser.invalid) 
    {
      console.log("form invalid");
      return;
    }
    else
    {
      this.updateUser.value.lastname = this.updateUser.value.lastname.toUpperCase();
      this.updateUser.value.firstname = this.updateUser.value.firstname.charAt(0).toUpperCase() + this.updateUser.value.firstname.substring(1).toLowerCase();
      this.userService.updateUserById(this.user.id, this.updateUser.value).subscribe();
      this.showToast();
      this.redirection(); 
    }
  }

  redirection()
  {
    setTimeout(() => this.router.navigateByUrl("/user"), 1000);
  }

  showToast()
  {
    const config: NbIconConfig = { status: 'primary', icon: 'edit-outline', pack: 'eva' };
    var userlastname = this.updateUser.value.lastname.toUpperCase();
    var userfirstname = this.updateUser.value.firstname.charAt(0).toUpperCase() + this.updateUser.value.firstname.substring(1).toLowerCase();
    this.toastrService.show('L\'utilisateur ' + userlastname + ' ' + userfirstname + ' a bien été modifié.', `Utilisateur mis à jour`, config);
  }

}
