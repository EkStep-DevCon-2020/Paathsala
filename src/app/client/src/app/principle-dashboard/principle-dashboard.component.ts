import { Component, OnInit } from '@angular/core';
import { DataService } from '../staff/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principle-dashboard',
  templateUrl: './principle-dashboard.component.html',
  styleUrls: ['./principle-dashboard.component.scss']
})
export class PrincipleDashboardComponent implements OnInit {

  public defaultProfileImg = './assets/images/default-profile.png';
  public teacherList;

  constructor(private dataService: DataService, public router: Router) {

   }

  ngOnInit() {
    const body = {
      "request": {
          "filters": {
            "objectType":"Teacher",
            "identifier": ["T1", "T2","T3", "T4", "T5","T6"],
            "status": []
          }
      }
  };
    this.dataService.post('https://devcon.sunbirded.org/action/composite/v3/search', body, { headers: {'Content-Type': 'application/json'}})
    .subscribe((data: any) => {
        console.log(data);
        this.teacherList = data.result.Teacher;
      },
      error => {
        console.log(error);
      }
    );
  }

}
