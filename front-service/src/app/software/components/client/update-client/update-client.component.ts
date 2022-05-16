import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbIconConfig, NbToastrService } from '@nebular/theme';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {

  client: Client = {} as Client

  updateClient!: FormGroup;

  submitted = false;

  constructor(private clientService: ClientService, private router: Router, private toastrService: NbToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.client = this.route.snapshot.data['client'];
    this.updateClient = this.updateFormGroup();
    this.updateClient.patchValue({
      lastname: this.client.lastname,
      firstname: this.client.firstname,
      address: this.client.address,
      town: this.client.town,
      postalcode: this.client.postalcode,
      phone: this.client.phone,
      email: this.client.email,
      company: this.client.company,
      logo: this.client.logo
    });
  }

  updateFormGroup(): FormGroup {
    return new FormGroup ({
      lastname: new FormControl("",[Validators.required]),
      firstname: new FormControl("",[Validators.required]),
      address: new FormControl("",[Validators.required]),
      postalcode: new FormControl("",[Validators.required]),
      town: new FormControl("",[Validators.required]),
      phone: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required]),
      company: new FormControl("",[Validators.required]),    
      logo: new FormControl("")
    })
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.updateClient.controls;
  }

  updateClientById(){
    this.submitted = true;
    if (this.updateClient.invalid) {
        return;
    }
    else
    {
      this.updateClient.value.lastname = this.updateClient.value.lastname.toUpperCase();
      this.updateClient.value.firstname = this.updateClient.value.firstname.charAt(0).toUpperCase() + this.updateClient.value.firstname.substring(1).toLowerCase();
      this.clientService.updateClientById(this.client.id, this.updateClient.value).subscribe();
      this.showToast();
      this.redirection(); 
    }
  }

  redirection() {
    setTimeout(() => this.router.navigateByUrl("/client"), 1000);
  }

  showToast() {
    const config: NbIconConfig = { status: 'primary', icon: 'edit-outline', pack: 'eva' };
    var clientlastname = this.updateClient.value.lastname.toUpperCase();
    var clientfirstname = this.updateClient.value.firstname.charAt(0).toUpperCase() + this.updateClient.value.firstname.substring(1).toLowerCase();
    this.toastrService.show('Le client ' + clientlastname + ' ' + clientfirstname + ' a bien été modifié.', `Client mis à jour`, config);
  }

}
