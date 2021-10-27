import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

  @Input('legend') legend: any[] = [];
  @Input('hiddenLabels') hidden: any[] = [];
  @Output('onToggle') onToggle = new EventEmitter<{ alias: string, state: boolean }>();

  constructor() { }

  ngOnInit(): void {
  }

}
