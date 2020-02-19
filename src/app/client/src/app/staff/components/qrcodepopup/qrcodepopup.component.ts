import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-qrcodepopup',
  templateUrl: './qrcodepopup.component.html',
  styleUrls: ['./qrcodepopup.component.scss']
})
export class QrcodepopupComponent implements OnInit {

  public enteredQrCode: any;
  public errormsg: any;
  @ViewChild('modal') modal;

  constructor(private location: Location, private router: Router, private dataService: DataService,
    public dashboardComponent: DashboardComponent) { }

  ngOnInit() {
  }

  public handleQRCode() {
    console.log(this.enteredQrCode);
    this.dataService.getData('https://devcon.sunbirded.org/api/teacher/v3/user/profile/' + this.enteredQrCode, {
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line: max-line-length
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyZWU4YTgxNDNiZWE0NDU4YjQxMjcyNTU5ZDBhNTczMiJ9.7m4mIUaiPwh_o9cvJuyZuGrOdkfh0Nm0E_25Cl21kxE'
      }
    }).subscribe((response) => {
      this.errormsg = '';
      this.location.go( '/staff/dashboard?qrcode=' + this.enteredQrCode );
      this.dashboardComponent.closePopup();
      this.modal.deny();
    }, (error) => {
      this.errormsg = 'Entered QR Code is Incorrect';
    });
  }

}
