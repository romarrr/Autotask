import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  newClient!: FormGroup;
 
  submitted = false;

  constructor(private router: Router, private clientService: ClientService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.newClient = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup ({
      firstname: new FormControl("",[Validators.required]),
      lastname: new FormControl("",[Validators.required]),
      address: new FormControl("",[Validators.required]),
      phone: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required, Validators.email]),
      company: new FormControl("",[Validators.required]),
      logo: new FormControl(""),
      postalcode: new FormControl("",[Validators.required]),
      town: new FormControl("",[Validators.required])
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.newClient.controls;
  }

  post(){
    this.submitted = true;
    if (this.newClient.invalid) {
        return;
    }
    else
    {
      this.newClient.value.lastname = this.newClient.value.lastname.toUpperCase();
      this.newClient.value.firstname = this.newClient.value.firstname.charAt(0).toUpperCase() + this.newClient.value.firstname.substring(1).toLowerCase();
      this.clientService.addClient(this.newClient.value).subscribe();
      this.showToast('success');
      this.redirection(); 
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/client"), 1000);
  }

  showToast(status: NbComponentStatus) {
    var clientlastname = this.newClient.value.lastname.toUpperCase();
    var clientfirstname = this.newClient.value.firstname.charAt(0).toUpperCase() + this.newClient.value.firstname.substring(1).toLowerCase();
    this.toastrService.show('Le client ' + clientlastname + ' ' + clientfirstname + ' a été ajouté.', `Client ajouté`, { status });
  }

}
