import { SeoService } from '../../../services/seoService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  constructor(private seoService: SeoService) { }

  ngOnInit() {
    window.scroll(0, 0);
  }

}
