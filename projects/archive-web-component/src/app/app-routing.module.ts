import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArchiveListComponent } from './archive-list/archive-list.component';
import { RetrieveImagesComponent } from './retrieve-images/retrieve-images.component';

const routes = [
  { path: 'archive-list', component: ArchiveListComponent},
  { path: 'retrieve-images',  component: RetrieveImagesComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
