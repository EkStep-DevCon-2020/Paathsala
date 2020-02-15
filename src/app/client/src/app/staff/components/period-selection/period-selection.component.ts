import { Component, ViewChild, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { Router } from '@angular/router';

@Component({
  selector: 'app-period-selection',
  templateUrl: './period-selection.component.html',
  styleUrls: ['./period-selection.component.scss']
})
export class PeriodSelectionComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [
    { title: 'Maths - Class 8', start: '2020-02-14T09:00:00', end: '2020-02-14T10:00:00', id: "do_11287198635947622412" },
    { title: 'Science - Class 8', start: '2020-02-14T10:00:00', end: '2020-02-14T11:00:00', id: "do_11287198635947622412"  },
    { title: 'English - Class 8', start: '2020-02-14T11:00:00', end: '2020-02-14T12:00:00', id: "do_11287198635947622412"  },
    { title: 'DIKSHA Time', start: '2020-02-14T12:00:00', end: '2020-02-14T13:00:00', id: "do_11287198635947622412"  }
  ];
  constructor( public router: Router){ }
  ngOnInit() {
  }

  handleEventClick(arg) {
    console.log(arg.event.id, arg.event.title);
    this.router.navigate(['play/collection/' + arg.event.id]);
  }

}
