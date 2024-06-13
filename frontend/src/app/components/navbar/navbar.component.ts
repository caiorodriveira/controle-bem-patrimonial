import { ScanearBemComponent } from './../../pages/bem/scanear-bem/scanear-bem.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user: any;

  constructor(private auth: AuthService, private dialog: MatDialog){}

  logout(){
    this.auth.logout()
  }

  ngAfterViewInit(): void {

  }

  setUser(){
    this.user = AuthService.getUser();
  }

  abrirScan(){
    this.dialog.open(ScanearBemComponent, {data: true});
  }
}
