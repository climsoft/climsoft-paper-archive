import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

import { ArchiveListService } from '../services/archive-list.service';
import { Archive } from '../shared/archive-type';


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

  archive?: Archive[];
  errMess?: string;

  count: any;

  page: number = 1;

  collection: Array<any> = [];

  config: any;

  singleImage?: string;

  // Customize ngx-pagination
  public maxSize: number = 7;

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



  constructor(private archiveListService: ArchiveListService,
    private el: ElementRef) { }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.config = {
      id: 'archiveimage',
      itemsPerPage: 5,
      currentPage: this.page,
      totalItems: this.count,
    };
  }

  getClimData(): void {
    this.archiveListService.getClimateData()
    .subscribe(list => {
      this.count = list.length;
      this.collection = list
    })
  }

  
  clearImage() {
    return this.singleImage = '';
  }


  getImage(imageId: string) {
    const getOneImage = this.collection.filter((item) => item.image == imageId)
    return this.singleImage = getOneImage[0].image;

  }


  rotationAmount: number = 0;
  rotateImage() {
    this.rotationAmount +=  45;
    this.el.nativeElement.querySelector('.archive-img').style.transform = `rotate(${this.rotationAmount}deg)`;

  }


}


