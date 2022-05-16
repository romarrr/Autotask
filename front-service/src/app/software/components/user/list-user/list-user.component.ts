import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: User[] = [];

  usersSorted: User[] = [];

  searchTerm!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.users = this.route.snapshot.data['users'];
    this.usersSorted = this.users.sort((a, b) => a.lastname> b.lastname? 1 : -1);
    for(var i=0; i<this.users.length; i++) 
    {
      this.users[i].phone = this.users[i].phone.replace(/(.{2})/g,"$1 ");
    }
  }

}
