import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RecapchaService } from './recapcha.service';

@Component({
  selector: 'app-recapcha',
  templateUrl: './recapcha.component.html',
  styleUrls: ['./recapcha.component.scss']
})
export class RecapchaComponent implements OnInit {
  @ViewChild('recap') recap: ElementRef

  constructor(private recapchaService: RecapchaService) { }
  imgName
  capchaText

  ngOnInit() {
    this.recapchaService.resetImg()
    this.recapchaService.img.subscribe(res => { this.imgName = res; })
  }

  resetImg() {
    this.recapchaService.resetImg()
    this.recapchaService.img.subscribe(res => this.imgName = res)
    this.capchaText = '';
    this.recap.nativeElement.focus();
  }

  checkChange() {
    // alert(this.capchaText)
    this.recapchaService.changeData(this.capchaText)
  }
}