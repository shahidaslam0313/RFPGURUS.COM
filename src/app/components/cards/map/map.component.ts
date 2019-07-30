import { States } from './../../arrays';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() cartonStatus: boolean;

  states;
  dict_state = States;

  constructor(private route: Router) { }

  ngOnInit() {
  }

  getState(event) {
    this.states = event['state-abbr']
    let searchUrl = 'advanced-search';
    this.route.navigate([searchUrl], { queryParams: { state: this.dict_state[this.states] } });
  }

}
