import {Component, ViewChild, OnInit} from '@angular/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import {Router} from '@angular/router';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-period-selection',
  templateUrl: './period-selection.component.html',
  styleUrls: ['./period-selection.component.scss']
})
export class PeriodSelectionComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [];

  constructor(public router: Router, private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getData('https://api.myjson.com/bins/bu6vg').subscribe(
      data => {
        console.log(data);
        this.calendarEvents = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  handleEventClick(arg) {
    console.log(arg.event.id, arg.event.title);
    this.router.navigate(['play/collection/' + arg.event.id]);
  }

}
