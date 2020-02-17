import {Component, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-selection',
  templateUrl: './profile-selection.component.html',
  styleUrls: ['./profile-selection.component.scss']
})
export class ProfileSelectionComponent implements OnInit {

  public defaultProfileImg = './assets/images/default-profile.png';
  public teacherList;

  constructor(private dataService: DataService, public router: Router) {
  }

  ngOnInit() {
    this.dataService.getData('https://api.myjson.com/bins/g00e4').subscribe(
      data => {
        console.log(data);
        this.teacherList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  public toogleSelected(teacher) {
    window.location.href = 'staff/period/selection/' + teacher.name;
  }
}
