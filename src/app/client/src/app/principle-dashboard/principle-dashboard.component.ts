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

  }
  handleToggle(type){
    console.log(type);
    if(type === 'class'){
      this.router.navigate(["principle/dashboard/class"]);
    } else {
      this.router.navigate(["principle/dashboard/teacher"]);
    }
  }

}
