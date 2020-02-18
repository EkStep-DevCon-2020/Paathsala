import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {

  public deviceId: string;
  public uuid: string;

  constructor(private httpClient: HttpClient) { }

  public registerTelemetry(obj: any): Observable < any > {
    this.deviceId = (<HTMLInputElement>document.getElementById('deviceId'))
        && (<HTMLInputElement>document.getElementById('deviceId')).value;
    this.uuid = UUID.UUID();
    const data = {
      'eid': 'DC_REGISTER',
      'mid': this.uuid,
      'ets': obj.ets ? obj.ets : '',
      'did': this.deviceId,
      'profileId': obj.profileId ? obj.profileId : '',
      'edata': obj.edata ? obj.edata : { }
    };
    return this.httpClient.post('/content/data/v1/telemetry', data);
  }

  public visitTelemetry(obj: any): Observable < any > {
    this.deviceId = (<HTMLInputElement>document.getElementById('deviceId'))
        && (<HTMLInputElement>document.getElementById('deviceId')).value;
    this.uuid = UUID.UUID();
    const data = {
      'eid': 'DC_VISIT',
      'mid': this.uuid,
      'ets': obj.ets ? obj.ets : '',
      'did': this.deviceId,
      'profileId': obj.profileId ? obj.profileId : '',
      'stallId': obj.stallId ? obj.stallId : '',
      'ideaId': obj.ideaId ? obj.ideaId : '',
      'edata': obj.edata ? obj.edata : { }
    };
    return this.httpClient.post('/content/data/v1/telemetry', data);
  }

  public engagementTelemetry(obj: any): Observable < any > {
    this.deviceId = (<HTMLInputElement>document.getElementById('deviceId'))
        && (<HTMLInputElement>document.getElementById('deviceId')).value;
    this.uuid = UUID.UUID();
    const data = {
      'eid': 'DC_ENGAGEMENT',
      'mid': this.uuid,
      'ets': obj.ets ? obj.ets : '',
      'did': this.deviceId,
      'profileId': obj.profileId ? obj.profileId : '',
      'studentId': obj.studentId ? obj.studentId : '',
      'stallId': obj.stallId ? obj.stallId : '',
      'ideaId': obj.ideaId ? obj.ideaId : '',
      'contentId': obj.contentId ? obj.contentId : '',
      'contentType': obj.contentType ? obj.contentType : '',
      'contentName': obj.contentName ? obj.contentName : '',
      'subject': obj.subject ? obj.subject : '',
      'grade': obj.grade ? obj.grade : '',
      'edata': obj.edata ? obj.edata : { }
    };
    data.edata.duration = obj.edata.duration ? obj.edata.duration : 0;
    return this.httpClient.post('/content/data/v1/telemetry', data);
  }

  public assessTelemetry(obj: any): Observable < any > {
    this.deviceId = (<HTMLInputElement>document.getElementById('deviceId'))
        && (<HTMLInputElement>document.getElementById('deviceId')).value;
    this.uuid = UUID.UUID();
    const data = {
      'eid': 'DC_ASSESS',
      'mid': this.uuid,
      'ets': obj.ets ? obj.ets : '',
      'did': this.deviceId,
      'profileId': obj.profileId ? obj.profileId : '',
      'stallId': obj.stallId ? obj.stallId : '',
      'ideaId': obj.ideaId ? obj.ideaId : '',
      'sid': obj.sid ? obj.sid : '',
      'contentId': obj.contentId ? obj.contentId : '',
      'contentType': obj.contentType ? obj.contentType : '',
      'contentName': obj.contentName ? obj.contentName : '',
      'edata': obj.edata ? obj.edata : { }
    };
    data.edata.duration = obj.edata.duration ? obj.edata.duration : 0;
    data.edata.maxScore = obj.edata.maxScore ? obj.edata.maxScore : 0;
    data.edata.score = obj.edata.score ? obj.edata.score : 0;
    return this.httpClient.post('/content/data/v1/telemetry', data);
  }

  public exitTelemetry(obj: any): Observable < any > {
    this.deviceId = (<HTMLInputElement>document.getElementById('deviceId'))
        && (<HTMLInputElement>document.getElementById('deviceId')).value;
    this.uuid = UUID.UUID();
    const data = {
      'eid': 'DC_EXIT',
      'mid': this.uuid,
      'ets': obj.ets ? obj.ets : '',
      'did': this.deviceId,
      'profileId': obj.profileId ? obj.profileId : '',
      'edata': obj.edata ? obj.edata : { }
    };
    return this.httpClient.post('/content/data/v1/telemetry', data);
  }

  public earnTelemetry(obj: any): Observable < any > {
    this.deviceId = (<HTMLInputElement>document.getElementById('deviceId'))
        && (<HTMLInputElement>document.getElementById('deviceId')).value;
    this.uuid = UUID.UUID();
    const data = {
      'eid': 'DC_EARN',
      'mid': this.uuid,
      'ets': obj.ets ? obj.ets : '',
      'did': this.deviceId,
      'profileId': obj.profileId ? obj.profileId : '',
      'studentId': obj.studentId ? obj.studentId : '',
      'stallId': obj.stallId ? obj.stallId : '',
      'ideaId': obj.ideaId ? obj.ideaId : '',
      'edata': obj.edata ? obj.edata : { }
    };
    data.edata.type = obj.edata.type ? obj.edata.type : '';
    data.edata.points = obj.edata.points ? obj.edata.points : 0;
    data.edata.badges = obj.edata.badges ? obj.edata.badges : [ ];
    return this.httpClient.post('/content/data/v1/telemetry', data);
  }

}