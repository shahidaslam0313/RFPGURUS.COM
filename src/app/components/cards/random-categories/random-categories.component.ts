import { Component, OnInit } from '@angular/core';
import { randomcategoris1 } from "../../arrays";
import { randomcategoris2 } from "../../arrays";
import { randomcategoris3 } from "../../arrays";
import { randomcategoris4 } from "../../arrays";

@Component({
  selector: 'app-random-categories',
  templateUrl: './random-categories.component.html',
  styleUrls: ['./random-categories.component.css']
})
export class RandomCategoriesComponent implements OnInit {

  category1 = randomcategoris1;
  category2 = randomcategoris2;
  category3 = randomcategoris3;
  category4 = randomcategoris4;

  constructor() { }

  ngOnInit() {
    console.log(this.category1);
  }

}
