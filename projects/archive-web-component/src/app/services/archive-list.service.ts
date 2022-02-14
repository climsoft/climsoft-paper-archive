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

}
