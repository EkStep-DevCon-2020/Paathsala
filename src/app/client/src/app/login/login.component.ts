import { ConfigService } from '../config/config.service';
import { TelemetryService } from '../telemetry/telemetry.service'
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';

const STALL_ID = 'school';
const IDEA_ID = 'staff-room';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('video') videoElement: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  videoWidth = 0;
  videoHeight = 0;
  openSuccessModal = false;
  openErrorModal = false;
  captureImage = false;
  qrCode = false;
  image: string;
  enteredQrCode: any;
  constraints = {
    video: {
      facingMode: 'environment',
      width: { ideal: 300 },
      height: { ideal: 300 }
    }
  };

  constructor(private renderer: Renderer2,
    public configService: ConfigService,
    public telemetryServcie: TelemetryService, private router: Router) { }

  ngOnInit() {
    this.telemetryServcie.initialize({
      did: 'device1',
      stallId: STALL_ID,
      ideaId: IDEA_ID
    });
  }
  handleQRCode(){
    this.configService.userInfo = {
      "osUpdatedAt": "2020-02-18T12:54:26.279Z",
      "code": "000000",
      "osCreatedAt": "2020-02-18T12:54:26.279Z",
      "name": "Demo user",
      "photo": "https://vignette.wikia.nocookie.net/jamescameronsavatar/images/5/5c/Avatar_Logo_revised.png/revision/latest?cb=20100207200600",
      "osid": "1-63c8bfe5-e5ca-4f3b-bb1a-46ac41f3b917"
    };
    this.openSuccessModal = true;
  }
  startCamera() {
    this.openErrorModal = false;
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }

  handleError(error) {
    console.log('Error: ', error);
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }
  capture() {
    this.captureImage = true;
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    this.image = this.canvas.nativeElement.toDataURL('image/png');
    this.uploadImage();
  }

  uploadImage() {
    const id = UUID.UUID();
    const imageId = 'do_11295943688090419214';
    const imageName = `${id}.png`;
    fetch(this.image)
      .then(res => res.blob())
      .then(blob => {
        const fd = new FormData();
        const file = new File([blob], imageName);
        fd.append('file', file);
        const request = {
          url: `private/content/v3/upload/${imageId}`,
          data: fd
        };
        this.configService.post(request).pipe(catchError(err => {
          const errInfo = { errorMsg: 'Image upload failed' };
          return throwError(errInfo);
        })).subscribe((response) => {
          console.log('response ', response);
          this.identifyFace(response);
        });
      });
  }

  identifyFace(response) {
    const request = {
      url: `reghelper/face/identify`,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        request: {
          photo: response.result.content_url
        }
      }
    };
    this.configService.post(request).pipe().subscribe((res) => {
      const data = {
        profileId: res.result.osid
      };
      this.telemetryServcie.visit(data);
      this.openSuccessModal = true;
      this.openErrorModal = false;
      this.configService.userInfo = res.result;
      console.log('-------response--------', res);
    }, error => {
      this.openErrorModal = true;
      console.log('-------error--------', error);
    });
  }
  navigate() {
    if(this.canvas && this.canvas.nativeElement){
      (this.canvas.nativeElement.getContext('2d')).clearRect(0, 0, this.canvas.nativeElement.height, this.canvas.nativeElement.width);
    }
    this.router.navigate(["staff/profile/selection"]);
  }
  closeModal() {
    (this.canvas.nativeElement.getContext('2d')).clearRect(0, 0, this.canvas.nativeElement.height, this.canvas.nativeElement.width);
    this.startCamera();
  }
}
