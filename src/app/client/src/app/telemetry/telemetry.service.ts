import { Injectable } from '@angular/core';
import * as Md5 from 'md5';
import { HttpClient } from '@angular/common/http';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  public stallId;
  public ideaId;
  public did;
  http: HttpClient;
  baseUrl = 'https://devcon.sunbirded.org/';
  constructor(http: HttpClient) {
    this.http = http;
  }

  public initialize(config) {
    this.did = config.did;
    this.stallId = config.stallId;
    this.ideaId = config.ideaId;
  }

  public visit(data) {
    const visitTelemetry = {
      eid : 'DC_VISIT',
      ets: (new Date()).getTime(),
      did: this.did,
      profileId: data.profileId,
      stallId: this.stallId,
      ideaId: this.ideaId,
      mid: '',
      edata: {}
    };
    visitTelemetry.mid = visitTelemetry.eid + ':' + Md5(JSON.stringify(visitTelemetry));
    const request = {
      url: `${this.baseUrl}content/data/v1/telemetry`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        id: 'api.sunbird.telemetry',
        ver: '3.0',
        params: {
          msgid: UUID.UUID()
        },
        ets: (new Date()).getTime(),
        events: [visitTelemetry]
      }
    };

    this.http.post(request.url, request.body, { headers: request.headers } ).pipe().subscribe((res) => {
      console.log('response ', res);
    });

  }
  public topicComplete(data, profileId, teacherId, teacherName) {
    const topicCompleteEvent: any = {
      "eid": "DC_SYLLABUS",
      "ets": (new Date()).getTime(),
      "profileId": profileId,
      "teacherId": teacherId,
      "teacherName": teacherName,
      "stallId": "STA2",
      "ideaId": "IDE9",
      "topicId": data.topicId,
      "topicName": data.topicName,
      "subject": data.subject,
      "grade": data.class,
      "edata": {
          "syllabus": data.done || true
      }
  }
  topicCompleteEvent.mid = topicCompleteEvent.eid + ':' + Md5(JSON.stringify(topicCompleteEvent));
  console.log("=========topicCompleteEvent========", topicCompleteEvent);
    const request = {
      url: `${this.baseUrl}content/data/v1/telemetry`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        id: 'api.sunbird.telemetry',
        ver: '3.0',
        params: {
          msgid: UUID.UUID()
        },
        ets: (new Date()).getTime(),
        events: [topicCompleteEvent]
      }
    };

    this.http.post(request.url, request.body, { headers: request.headers } ).pipe().subscribe((res) => {
      console.log('response ', res);
    });
  }


  public dcattendence(user, teacher) {
    const visitTelemetry  = {
      'eid': 'DC_ATTENDENCE',
      'mid': UUID.UUID(),
      'ets': 1.582108725133E12,
      'profileId': user.osid,
      'teacherId': teacher.identifier,
      'stallId': 'STA2',
      'ideaId': 'IDE9',
      'sid': '08021717',
      'edata': {
        'profileUrl': teacher.avatar,
        'name': teacher.name,
        'osid': user.osid
      },
      'syncts': 1582108886755,
      '@timestamp': '2020-02-19T10:41:26.755Z'
    };

    const request = {
      url: `${this.baseUrl}content/data/v1/telemetry`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        id: 'api.sunbird.telemetry',
        ver: '3.0',
        params: {
          msgid: UUID.UUID()
        },
        ets: (new Date()).getTime(),
        events: [visitTelemetry]
      }
    };

    this.http.post(request.url, request.body, { headers: request.headers } ).pipe().subscribe((res) => {
      console.log('response ', res);
    });
  }
}
