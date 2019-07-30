import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { SharedData } from '../../../services/shared-service';
import * as moment from 'moment';
import { SeoService } from '../../../services/seoService';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  
  @ViewChild('openModal') openModal: ElementRef;
  loaded = false;
  CategoryCheck = false;
  public query: any;
  public Rfp: any;
  public selected: any;
  state: any = [];
  cat: any = [];
  date;
  check(date) {
    this.date = moment(date, this.formats, true).isValid()
    return this.date;
  }
  text:any = {
    Year: 'Year',
    Month: 'Month',
    Weeks: "Weeks",
    Days: "Days",
    Hours: "Hrs",
    Minutes: "Mins",
    Seconds: "Secs",
    MilliSeconds: "MilliSeconds"
  };
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
  category;
  item;
  posted = '';
  enter;
  record: any = [];
  local;
  uname;
  subscribe;
  search: boolean = false;
  enterdate;
  duedate;
  cates;
  status;
  constructor(public _shareData: SharedData, private _serv: HomeService, private _nav: Router, private seoService: SeoService) { }

  mainSearch = 0;

  closeSearch() {
    if (this.mainSearch == 1) {
      this.mainSearch = 0;
      this.query = '';
      this.Rfp = '';
    }
  }
  
  focusInput() {
    if (this.mainSearch == 1) {
      let inputField: HTMLElement = <HTMLElement>document.querySelectorAll('.search-holder input')[0];
      inputField.focus();
    }
  }
  filter(query) {
    if (this.query !== "") {
      this._serv.searchrecord(this.query).subscribe(response => {
        this.Rfp = response['results'];
        this.loaded = true;
      });
    }
  }
  
  singlerfp(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  select(item) {
    this.selected = item;
    this.mainSearch = 0;
    this.query = '';
    this.Rfp = '';
  }
  stateInfo(state) {
    this._shareData.stateInfo(state);
    let sth = 'state';
    this._nav.navigate([sth], { queryParams: { state: state, } });
  }

  ngOnInit() {
    window.scroll(0, 0);
this.timer();
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.defaultTitle();

    // Updating Open Graph
    this.seoService.defaultOGTitle();
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.defaultTwitterTitle();

    // --------------- SEO Service End ---------------
    // if (navigator.webdriver == true) {
    //   window.location.href = "http://google.com";
  
    this.subscriber();

    setTimeout(() => {
      this.openModal.nativeElement.click();
    }, 200);

    this.getRFPandCategory();
    this.CategorySlider();
    this.LatestRFPs();
  // }
}

  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username;
      return true;
    } else {
      return false;
    }
  }
  single(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  public slideConfig;
  public slideConfig2;

  CategorySlider() {

    this.slideConfig = {
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: false,
      dots: false,
      prevArrow: '<button class="leftRsBanner"><i class="fa fa-arrow-left"></i></button>',
      nextArrow: '<button class="rightRsBanner"><i class="fa fa-arrow-right"></i></button>',
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 605,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        }

      ]
    };
  }
  LatestRFPs() {

    this.slideConfig2 = {
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      dots: false,
      prevArrow: '<button class="leftRsBanner"><i class="fa fa-arrow-left"></i></button>',
      nextArrow: '<button class="rightRsBanner"><i class="fa fa-arrow-right"></i></button>',
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 605,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        }

      ]
    };


  }
  ngOnDestroy() {
    $('#exampleModalCenter').modal('hide');
  }

  Areas = [
    { area: 'California', class: 'btn-primary' },
    { area: 'Illinois', class: 'btn-warning' },
    { area: 'Texas', class: 'btn-info' },
    { area: 'Florida', class: 'btn-danger' },
    { area: 'Massachusetts', class: 'btn-success' },
    { area: 'New Jersey', class: 'btn-secondry' },
    { area: 'North Carolina', class: 'btn-primary' },
    { area: 'New York', class: 'btn-info' }
  ]

  // ====================== Service Calls

  subscriber() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username
      this._serv.usersubscribe(this.uname).subscribe(
        data => {
          if (data['Response'] == "Subscribe user" || data['Response'] == "Trial Subscription user") {
            this.subscribe = data['Response'];
            this._shareData.subscribed_user(this.subscribe);
            return false
          }
        });
    }
    else {
      return true
    }
  }

  getRFPandCategory() {
    this._serv.rfpcategory().subscribe(data => {
        this.cat = data;
        this.CategoryCheck = true;
      });
    this._serv.latestrfps()
      .subscribe(data => {
        this.record = data['results'];
        console.log(this.record);
      });
  }
  totaltime;
timer(){
  this._serv.gettimer().subscribe( data => {
    this.totaltime = data.json();
    // alert(this.totaltime);
    console.log(this.totaltime);
  })
}

}