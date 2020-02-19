import {Component, ViewChild, OnInit} from '@angular/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import {DataService} from '../../service/data.service';
import { map } from 'rxjs/operators';
import { ConfigService } from '../../../config/config.service';

const year = (new Date()).getFullYear();
const currentDay = (new Date()).getDate();
const currentHour = (new Date()).getHours()
const completedClassColor = '#010035';
const ongoingClassColor = '#613ad2';
const upcomingClassColor = '#FFF';

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
  selector: 'app-period-selection',
  templateUrl: './period-selection.component.html',
  styleUrls: ['./period-selection.component.scss']
})
export class PeriodSelectionComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [];
  profileInfo = {};
  constructor(public router: Router, public activatedRoute: ActivatedRoute, private dataService: DataService, public configService: ConfigService){ 
    if(!this.configService.userInfo){
      this.router.navigate(['staff']);
    }
  }
  ngOnInit() {
    const today = new Date();
    today.setHours(today.getHours(),0,0,0)
    this.getTeacherTimeTable(this.activatedRoute.snapshot.params.id).subscribe(data => {
      console.log(data);
      this.profileInfo = data;
      this.configService.teacherInfo = data;
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
  handleEventClick(arg) {
    this.configService.sessionId = arg.event.extendedProps.sessionId;
    console.log(arg.event.backgroundColor, arg.event);
    if(arg.event.backgroundColor === completedClassColor){
      this.router.navigate(['staff/dashboard/' + this.configService.sessionId]);
    } else {
      this.router.navigate(['play/collection/' + arg.event.id]);
    }
  }
}
