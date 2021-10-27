import {Component, HostListener} from '@angular/core';
import * as _ from 'lodash';
import {EventService} from "./event/event.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostListener('wheel', ['$event']) onWheel(event: WheelEvent) {
    this.event.fire(event);
  }

  title = 'electron-ng-differential-equations';


  constructor(private event: EventService) {}
}
