import { MapComponent } from './map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsMapModule } from 'angular-us-map';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, UsMapModule],
  exports: [MapComponent]
})
export class MapModule { }
