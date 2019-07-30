import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecapchaComponent } from './recapcha.component';
import { RecapchaService } from './recapcha.service';

@NgModule({
  imports: [
    CommonModule,    
    FormsModule,
  ],
  declarations: [RecapchaComponent],
  exports: [RecapchaComponent],
  providers: [RecapchaService]
})
export class RecapchaModule { }
