import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  mode = 'default';

  constructor(
    private themeService: NbThemeService
  ) {}

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
