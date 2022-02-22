import { NgModule, DoBootstrap, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import {FormsModule} from "@angular/forms";
import { TabsModule } from '../coreui/tabs';
import { NavModule } from '../coreui/nav';
import { GridModule } from '../coreui/grid';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from '../coreui/modal';
import { FormModule } from '../coreui/form';
import { ButtonModule } from '../coreui/button';
import { SpinnerModule } from '../coreui/spinner';


import { AppComponent } from './app.component';
import { ArchivePaperImageComponent } from './archive-paper-image/archive-paper-image.component';
import { HighlightDirective } from './highlight.directive';
import { RemoveHighlightDirective } from './remove-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    ArchivePaperImageComponent,
    HighlightDirective,
    RemoveHighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TabsModule,
    NavModule,
    GridModule,
    NgxPaginationModule,
    ModalModule,
    NgxPaginationModule,
    FormModule,
    ButtonModule,
    FormsModule,
    SpinnerModule
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
