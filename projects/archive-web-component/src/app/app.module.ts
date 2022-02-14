import { NgModule, DoBootstrap, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { TabsModule } from '../coreui/tabs';
import { NavModule } from '../coreui/nav';
import { GridModule } from '../coreui/grid';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppComponent } from './app.component';
import { ArchivePaperImageComponent } from './archive-paper-image/archive-paper-image.component';
import { AppRoutingModule } from './app-routing.module';
import { ArchiveListComponent } from './archive-list/archive-list.component';
import { RetrieveImagesComponent } from './retrieve-images/retrieve-images.component';
import { HighlightDirective } from './highlight.directive';
import { RemoveHighlightDirective } from './remove-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    ArchivePaperImageComponent,
    ArchiveListComponent,
    RetrieveImagesComponent,
    HighlightDirective,
    RemoveHighlightDirective
  ],
  imports: [
    BrowserModule,
    TabsModule,
    NavModule,
    GridModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  entryComponents: [ArchivePaperImageComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap { 

  constructor(private injector: Injector) {
    const webComponent = createCustomElement(ArchivePaperImageComponent, {injector});
    customElements.define('archive-paper-image', webComponent);
  }

  ngDoBootstrap() {}

}
