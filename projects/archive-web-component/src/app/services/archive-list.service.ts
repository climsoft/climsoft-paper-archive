import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { ARCHIVE } from '../shared/archive-list';
import { Archive } from '../shared/archive-type';




@Injectable({
  providedIn: 'root'
})
export class ArchiveListService {

  constructor(private http: HttpClient,
    private ProcessHttpmsgService: ProcessHttpmsgService) { }

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

  onUpload(fileArray: any) {

    var formData = new FormData();

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      formData.append('file', file);
    }

    return this.http.post<any>(baseURL + 'v1/file-upload/image', formData)
    .pipe(catchError(this.ProcessHttpmsgService.handleError));
    

  }

  uploader(file:any){
    const fd = new FormData();
    fd.append('image', file, file.name)

    return this.http.post<File>(baseURL + 'v1/file-upload/image', fd)
    .pipe(catchError(this.ProcessHttpmsgService.handleError));
    
  }


  submitUnstructured(values:any) {
    return of()
  }

}
