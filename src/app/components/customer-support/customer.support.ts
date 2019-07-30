import {
  Component,
  OnInit
} from '@angular/core';
import {
  CustomerService
} from './customer-service';
// import {
//   SharedData
// } from '../../shared-service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'customer-support',
  templateUrl: 'customer.support.html',
  styleUrls: ['./customer.support.css']
})
export class CustomerSupportComponent implements OnInit {

  constructor(private customerSupport: CustomerService, private fb: FormBuilder) {}
  
  form: FormGroup
  disable = true;
  topic;
  newsubject = new FormControl("", Validators.required)
  ngOnInit() {
    this.form = this.fb.group({
      des: new FormControl("", Validators.required),
      sub: new FormControl("", Validators.required)
    });
    this.tickets();
  }
  views;
  tickets(){
    this.customerSupport.getview().subscribe( data=> {
      this.views = data;
      // alert(this.views);
      console.log(this.views);
    })
  }
 subjects;
  CustomerSupport() {
  
    this.customerSupport.support(this.form.value['sub'] , this.form.value['des']).subscribe(res => {
      // alert(this.form.value['des']);
      // this.alert.AlertBox("success", "Your query has been sent")
      this.form.reset();

      this.newsubject.reset();

      swal({
        type: 'success',
        title: 'Successfully posted',
        showConfirmButton: false,
        width: '512px',
        timer: 2000
      });
    });
    this.tickets();
  }

  isSubject
  queryList = [{
      key: "Having issue in download",
      value: "Having issue in download"
    },
    {
      key: "Issue related to pricing",
      value: "Issue related to pricing"
    },
    {
      key: "other",
      value: "Other"
    }
  ]
  changeSubject(event) {
    if (event.value != '') {
      this.disable = false
    }
  }
  change(event) {
    if (event.isUserInput) {
      if (event.source.value == "other") {
        this.isSubject = event.source.selected
        this.disable = true;
      } else {
        this.isSubject = false
        this.disable = false
      }
    }
  }
}