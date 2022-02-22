import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

import { ArchiveListService } from '../services/archive-list.service';
import { Archive } from '../shared/archive-type';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-archive-paper-image',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './archive-paper-image.component.html',
  styleUrls: ['./archive-paper-image.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})
export class ArchivePaperImageComponent implements OnInit {

  //archive?: Archive[];
  stationid!: string;
  formid!: string;
  year!: string;
  month!: string;
  day!: string;
  hour!: string;
  date!: Date;

  errMess?: string;

  spin?: boolean = true;
  delete_spinner?: boolean = true;
  toggle: string = '';

  count: any;

  page: number = 1;

  page_2: number = 1;

  //collection: Array<any> = [];
  collection: Archive[] = [];

  config: any;
  config_2: any;

  singleImage?: string;

  zoomedImage!: string;

  // Customize ngx-pagination
  public maxSize: number = 7;

  public maxSize_2: number = 4;

  public directionLinks: boolean = true;

  public autoHide: boolean = false;

  public responsive: boolean = true;

  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page ${this.page}`,
  };

  public labels_2: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page ${this.page_2}`,
  };



  constructor(private archiveListService: ArchiveListService,
    private el: ElementRef) { }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  pageChanged_2(event: any) {
    this.config_2.currentPage = event;
  }

  ngOnInit(): void {
    this.config = {
      id: 'archiveimage',
      itemsPerPage: 5,
      currentPage: this.page,
      totalItems: this.count,
    };

    this.config_2 = {
      id: 'retrieveimage',
      itemsPerPage: 1,
      currentPage: this.page_2,
      totalItems: this.count,
    };
  }

  getClimData(): void {
    this.archiveListService.getClimateData()
    .subscribe({
      next: list => {
        this.count = list.length;
        this.collection = list
        let date = this.collection[0].form_datetime
        //console.log('date ',Date.parse(date))
      },
      error: () => console.error()
      
    })
  }


  clearImage() {
    this.singleImage = '';
    this.getClimData()
  }


  getImage(imageId: string) {

    this.singleImage = ''
    const getOneImage = this.collection!.filter((item) => item.image == imageId)

    setTimeout(() => {
      this.singleImage = getOneImage[0].image;
      this.zoomedImage = getOneImage[0].zoom_image;
    },3000)
    
  }


  rotationAmount: number = 0;
  rotateImage() {
    this.rotationAmount +=  45;
    this.el.nativeElement.querySelector('.archive-img').style.transform = `rotate(${this.rotationAmount}deg)`;

  }


  onClick() {
    this.singleImage = ''
    this.spin = false;
    
    this.stationid = (<HTMLInputElement>document.getElementById("stationid")).value
    this.formid = (<HTMLInputElement>document.getElementById("formid")).value
    this.year = (<HTMLInputElement>document.getElementById("year")).value
    this.month = (<HTMLInputElement>document.getElementById("month")).value
    this.day = (<HTMLInputElement>document.getElementById("day")).value
    this.hour = (<HTMLInputElement>document.getElementById("hour")).value

    this.date = new Date(parseInt(this.year), parseInt(this.month), parseInt(this.day), parseInt(this.hour))
    let myform = {
      stationid: this.stationid,
      formid: this.formid,
      date: this.date
    }
    console.log('myform ',myform)

    this.archiveListService.findClimateData(myform)
    .subscribe({
      next: res => {

        setTimeout(() => {
          this.spin = true;
          this.singleImage = res.image;
          this.zoomedImage = res.zoom_image;
        },3000)
        
      },
      error: error => {
        console.log(error)
        this.spin = true;
        this.errMess = error;
        
      }
    })
  }

  removeClimateData() {

    this.delete_spinner = false

    this.stationid = (<HTMLInputElement>document.getElementById("stationid")).value
    this.formid = (<HTMLInputElement>document.getElementById("formid")).value
    this.year = (<HTMLInputElement>document.getElementById("year")).value
    this.month = (<HTMLInputElement>document.getElementById("month")).value
    this.day = (<HTMLInputElement>document.getElementById("day")).value
    this.hour = (<HTMLInputElement>document.getElementById("hour")).value

    this.date = new Date(parseInt(this.year), parseInt(this.month), parseInt(this.day), parseInt(this.hour))
    let myform = {
      stationid: this.stationid,
      formid: this.formid,
      date: this.date
    }

    this.archiveListService.deleteClimateData(myform)
    .subscribe({
      next: res => {
        setTimeout(() => {
          this.delete_spinner = true;
          this.collection = []
          this.collection = res;
          //this.toggle = 'staticBackdropModal.id'
        },3000)
        
      },
      error: error => {
        console.log(error)
        this.delete_spinner = true
        this.errMess = error
      }
    })

  }

}


