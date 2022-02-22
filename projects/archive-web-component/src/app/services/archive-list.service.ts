import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { ARCHIVE } from '../shared/archive-list';
import { Archive } from '../shared/archive-type';




@Injectable({
  providedIn: 'root'
})
export class ArchiveListService {

  constructor() { }

  getClimateData(): Observable<Archive[]> {
    return of(ARCHIVE)
  }

  findClimateData(myform:any): Observable<any> {
    let myObj = ARCHIVE.find(obj => obj.formid === myform.formid ? obj : null);
    return of(myObj)
  }

  deleteClimateData(myform:any): Observable<any> {
    let myArray = ARCHIVE.filter( obj => obj.formid !== myform.formid);
    return of(myArray);
  }

}
