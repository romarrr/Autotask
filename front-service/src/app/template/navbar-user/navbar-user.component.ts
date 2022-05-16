import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {

  mode = 'default';
  
  constructor(private themeService: NbThemeService) { }

  switchMode(mode: string)
  { 
    this.mode = mode;
    if(mode == 'default')
    { 
      this.themeService.changeTheme('dark');
      this.mode = 'dark';
    }
    else
    {
      this.themeService.changeTheme('default');
      this.mode = 'default';
    }  
  }

  ngOnInit(): void {
  }

}
