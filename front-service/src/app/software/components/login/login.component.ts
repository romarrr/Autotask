import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Planning } from '../../models/planning';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { PlanningService } from '../../services/planning.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {} as User;

  plannings: Planning[] = [];

  planningId!: string;

  chargement = false;
  msgError = false;
  msgGood = false;

  login!: FormGroup;

  constructor(
    private router: Router, 
    private loginService: LoginService, 
    private route: ActivatedRoute, 
    private planningService: PlanningService
  ) { }

  ngOnInit(): void {
    this.planningService.getPlannings().subscribe(p => this.plannings = p);
    this.login = this.createFormGroup();
  }

  determinePlanningId()
  {
    for(var i = 0; i < this.plannings.length; i++)
    {
      if(this.user.role == "Développeur" && this.plannings[i].role == "Développeur")
      { 
        this.planningId = this.plannings[i].id;
      }
      else if(this.user.role == "Administrateur" && this.plannings[i].role == "Administrateur")
      { 
        this.planningId = this.plannings[i].id;
      }
      else if(this.user.role == "Commercial" && this.plannings[i].role == "Commercial")
      { 
        this.planningId = this.plannings[i].id;
      }
    }
  }

  createFormGroup(): FormGroup {
    return new FormGroup ({
      email: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.login.controls;
  }
  
  post(){
    this.msgGood = false;
    this.msgError = false;
    this.chargement = true;
    this.loginService.getUserByEmail(this.login.value.email).subscribe(u => this.user = u);
    setTimeout(() => this.determinePlanningId(), 1500);
    setTimeout(() => this.redirectDev(), 2000);
  }

  redirectDev()
  {
    if(this.user == null)
    { 
      this.chargement = false;
      this.msgGood = false;
      this.msgError = true;
      console.log("Cet e-mail n'existe pas.");
    }
    else if(this.login.value.email == this.user.email && this.login.value.password != this.user.password)
    { 
      this.chargement = false;
      this.msgGood = false;
      this.msgError = true;
      console.log("Mot de passe incorrect.");
    }
    else if(this.user.email !== "admin" && this.user.email === this.login.value.email && this.user.password === this.login.value.password && this.user.role == "Développeur") 
    {
      this.chargement = false;
      this.msgGood = true;
      this.msgError = false;
      console.log("Connexion en cours, veuillez patientier...");
      setTimeout(() => this.router.navigateByUrl("/developer/" + this.planningId + "/user/" + this.user.id + "/todos"), 2000);
    }
    else if(this.login.value.email === "admin" && this.user.email === this.login.value.email && this.login.value.password === "admin" && this.user.password === this.login.value.password)
    {
      this.chargement = false;
      this.msgGood = true;
      this.msgError = false;
      console.log("Connexion en cours, veuillez patientier...");
      setTimeout(() => this.router.navigateByUrl("/administrator"), 2000);
    }
  }

}
