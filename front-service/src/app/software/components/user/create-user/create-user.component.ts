import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Skill } from '../../../models/skill';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  newUser!: FormGroup;

  roles = ["Administrateur", "Commercial", "Développeur"];

  submitted = false;

  skills: Skill[] = [];

  skillsId: string[] = [];

  skillsSorted: Skill[] = [];

  skillList: Skill[] = [];

  skillsSelected: string[] = [];

  selected!: string;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.skills = this.route.snapshot.data['skills'];
    this.skillsSorted = this.skills.sort((a, b) => a.specializationname> b.specializationname? 1 : -1);
    this.newUser = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup ({
      role: new FormControl("",[Validators.required]),
      firstname: new FormControl("",[Validators.required]),
      lastname: new FormControl("",[Validators.required]),
      address: new FormControl("",[Validators.required]),
      phone: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required]),
      logo: new FormControl(""),
      postalcode: new FormControl("",[Validators.required]),
      town: new FormControl("",[Validators.required]),
      skillsid: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.newUser.controls;
  }

  post(){
    this.submitted = true;
    if (this.newUser.invalid) {
        return;
    }
    else
    {
      for(var i=0; i<this.skillsSelected.length; i++)
      {
        this.skillsId.push(this.skillsSelected[i]);
      }
      this.newUser.value.skillsid = this.skillsId;
      this.newUser.value.lastname = this.newUser.value.lastname.toUpperCase();
      this.newUser.value.firstname = this.newUser.value.firstname.charAt(0).toUpperCase() + this.newUser.value.firstname.substring(1).toLowerCase();
      this.userService.addUser(this.newUser.value).subscribe();
      this.showToast('success');
      this.redirection(); 
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/user"), 1000);
  }

  showToast(status: NbComponentStatus) {
    var userlastname = this.newUser.value.lastname.toUpperCase();
    var userfirstname = this.newUser.value.firstname.charAt(0).toUpperCase() + this.newUser.value.firstname.substring(1).toLowerCase();
    this.toastrService.show('L\'utilisateur ' + userlastname + ' ' + userfirstname + ' a été ajouté.', `Utilisateur ajouté`, { status });
  }

}
