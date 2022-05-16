import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {} as User

  chargement = false;
  msgError = false;
  msgGood = false;

  login!: FormGroup;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.login = this.createFormGroup();
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
    else if(this.user.email !== "admin" && this.user.email === this.login.value.email && this.user.password === this.login.value.password) 
    {
      this.chargement = false;
      this.msgGood = true;
      this.msgError = false;
      console.log("Connexion en cours, veuillez patientier...");
      setTimeout(() => this.router.navigateByUrl("/planningdeveloper/user/" + this.user.id + "/todos"), 2000);
    }
    else if(this.login.value.email === "admin" && this.user.email === this.login.value.email && this.login.value.password === "admin" && this.user.password === this.login.value.password)
    {
      this.chargement = false;
      this.msgGood = true;
      this.msgError = false;
      console.log("Connexion en cours, veuillez patientier...");
      setTimeout(() => this.router.navigateByUrl("/home"), 2000);
    }
  }

}
