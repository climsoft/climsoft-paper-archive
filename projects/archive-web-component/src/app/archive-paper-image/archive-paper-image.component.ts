import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
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

  u_stationid!: string;
  u_formid!: string;
  u_year!: string;
  u_month!: string;
  u_day!: string;
  u_hour!: string;
  u_date!: Date;

  errMess?: string;
  fileUploadErrMess?: string;

  spin?: boolean = true;
  modalSpinner?: boolean = false;
  delete_spinner?: boolean = true;
  toggle: string = '';

  count: any;

  page: number = 1;

  page_2: number = 1;

  //collection: Array<any> = [];
  collection: Archive[] = [];
  selectedFiles: Array<any> = [];
  selectedFile?: File;
  unstructuredFileTarget?: any;

  config: any;
  config_2: any;

  singleImage?: string;

  modalImage?: string;

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

  ngAfterViewInit(): void {
    
  }


  fileSelected($event:any): void {
    
    //this.selectedFile = <File>$event.target.files[0];

    let target = $event.target.files;
    for (let i = 0; i < target.length; i++) {

      // var validExt = [ 'jpeg', 'jpg', 'png', 'webp' ];
      // var ext = target[i].name.split('.').pop();
      // var filename = target[i].name.split('-');
      // console.log('ext ',ext)
      // console.log('filename ',filename)

      // if (filename.length < 3) {
      //   this.fileUploadErrMess = "One or more Filename structure not allowed!";
      //   console.log(this.fileUploadErrMess)
      //   return
      // }

      // if (filename[2].length !== 12) {
      //   console.log(filename[2].length)
      //   this.fileUploadErrMess = "One or more Filename structure not allowed!";
      //   console.log(this.fileUploadErrMess)
      //   return
      // }

      // if (!validExt.includes(ext)) {
      //   this.fileUploadErrMess = "File type not allowed!";
      //   console.log(this.fileUploadErrMess)
      //   return
      // }

      this.selectedFiles.push(target[i])

    }
  }

  uploadStructuredFilenames(): void {
    console.log('doc upload ')
    this.archiveListService.onUpload(this.selectedFiles)
    //this.archiveListService.uploader(this.selectedFile)
    .subscribe({
      next: (res:any) => console.log("res ",res),
      error: (error:any) => console.log("error ",error)
    })
  }
  
  setValue($event:any, index:any){

    if($event.target.checked === false){
      this.selectedFiles.splice(index, 1)
      console.log('files ',this.selectedFiles)
    }
  }

  getClimData(): void {
    this.archiveListService.getClimateData()
    .subscribe({
      next: list => {
        this.count = list.length;
        this.collection = list
        //let date = this.collection[0].form_datetime
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

  modalImageRotationAmount: number = 0;
  rotateModalImage() {
    this.modalImageRotationAmount +=  45;
    this.el.nativeElement.querySelector('.archive-img-modal').style.transform = `rotate(${this.modalImageRotationAmount}deg)`;

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
        console.log('res ',res)
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

  clickModal() {

    this.modalImage = ''
    this.modalSpinner = true;
    
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
        console.log('res ',res)
        setTimeout(() => {
          this.modalSpinner = false;
          this.modalImage = res.image;
          //this.zoomedImage = res.zoom_image;
        },3000)
        
      },
      error: error => {
        console.log(error)
        this.modalSpinner = false;
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
        },3000)
        
      },
      error: error => {
        console.log(error)
        this.delete_spinner = true
        this.errMess = error
      }
    })

  }

  unstructuredFileSelected($event:any) {

    this.unstructuredFileTarget = $event.target.files;

    console.log('unstructured target ',this.unstructuredFileTarget)

  }

  onSubmitUnstructured() {

    this.u_stationid = (<HTMLInputElement>document.getElementById("u-stationid")).value
    this.u_formid = (<HTMLInputElement>document.getElementById("u-formid")).value
    this.u_year = (<HTMLInputElement>document.getElementById("u-year")).value
    this.u_month = (<HTMLInputElement>document.getElementById("u-month")).value
    this.u_day = (<HTMLInputElement>document.getElementById("u-day")).value
    this.u_hour = (<HTMLInputElement>document.getElementById("u-hour")).value

    this.u_date = new Date(parseInt(this.year), parseInt(this.month), parseInt(this.day), parseInt(this.hour))
    
    let myform = {
      stationid: this.u_stationid,
      formid: this.u_formid,
      year: this.u_year,
      month: this.u_month,
      day: this.u_day,
      hour: this.u_hour,
      file: this.unstructuredFileTarget
    }
    console.log('myform ',myform)

    // this.archiveListService.submitUnstructured(myform)
    // .subscribe({
    //   next: res => {
    //     console.log('res ',res)
        
    //   },
    //   error: error => {
    //     console.log(error)        
    //   }
    // })

  }

}


