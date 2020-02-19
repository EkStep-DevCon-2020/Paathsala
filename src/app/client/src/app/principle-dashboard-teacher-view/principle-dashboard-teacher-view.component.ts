import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../staff/service/data.service';
import {SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE} from '../theme/app-animations';
import { map } from 'rxjs/operators';
const year = (new Date()).getFullYear();
const currentDay = (new Date()).getDate();
const currentHour = (new Date()).getHours()
const completedClassColor = '#010035';
const ongoingClassColor = '#613ad2';
const upcomingClassColor = '#FFF';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
const ClassMap =  {
  "01" : "Class 1",
  "02" : "Class 2",
  "03" : "Class 3",
  "04" : "Class 4",
  "05" : "Class 5",
  "06" : "Class 6",
  "07" : "Class 7",
  "08" : "Class 8",
  "09" : "Class 9",
  "10" : "Class 10",
}
@Component({
  selector: 'app-principle-dashboard-teacher-view',
  templateUrl: './principle-dashboard-teacher-view.component.html',
  styleUrls: ['./principle-dashboard-teacher-view.component.scss'],
  animations: [SLIDE_UP_DOWN, FLYIN, APPEAR_DOWN, CARD_ANIMATION, APPEAR_SIDE]
})
export class PrincipleDashboardTeacherViewComponent implements OnInit {
  public defaultProfileImg = './assets/images/default-profile.png';
  public teacherList;
  constructor(private dataService: DataService, public router: Router) { }
  profileInfo = {};
  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [];
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
        if (this.teacherList.length > 0 ){
          // this.teacherList[0].selected = true;
          this.toggleSelected(this.teacherList[0]);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public toggleSelected(teacher) {
    this.teacherList.map( t => {
      t.selected = false;
    });
    console.log(teacher);
    teacher.selected = !teacher.selected;
    this.updateCalender(teacher.identifier);
  }
  updateCalender(id) {
    const today = new Date();
    today.setHours(today.getHours(),0,0,0)
    this.getTeacherTimeTable(id).subscribe(data => {
      console.log(data);
      this.profileInfo = data;
      this.calendarEvents = data.periods.map((row) => {
        const sessionIdArray = row.sessionId.match(/.{1,2}/g);
        const sessionIdMap = {
          class: sessionIdArray[0],
          month: parseInt(sessionIdArray[1]),
          day: parseInt(sessionIdArray[2]),
          hour: parseInt(sessionIdArray[3])
        }
        const event: any = {
          title: `${row.subject} - ${ClassMap[sessionIdMap.class]}`,
          start: new Date(year, sessionIdMap.month - 1, sessionIdMap.day, sessionIdMap.hour),
          end: new Date(year, sessionIdMap.month - 1, sessionIdMap.day, sessionIdMap.hour + 1),
          id: row.textBookId, 
          sessionId: row.sessionId
        }
        if(event.start.getTime() < today.getTime()){
          event.backgroundColor = completedClassColor;
        } else if(event.start.getHours() === today.getHours() && event.start.getDate() === today.getDate()){
          event.backgroundColor = ongoingClassColor;
        } else {
          event.backgroundColor = upcomingClassColor;
        }
        return event;
      })
    }, error => {
      console.log('getTeacherTimeTable error', error);
    });
    console.log(this.calendarEvents);
  }
  getTeacherTimeTable(id){
    return this.dataService.getData('https://devcon.sunbirded.org/api/teacher/v3/read/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyZWU4YTgxNDNiZWE0NDU4YjQxMjcyNTU5ZDBhNTczMiJ9.7m4mIUaiPwh_o9cvJuyZuGrOdkfh0Nm0E_25Cl21kxE'
      }
    }).pipe(map(response => {
      return response.result.teacher;
    }));
  }
}
