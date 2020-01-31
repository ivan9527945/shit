import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { NotifierComponent } from './component/notifier/notifier.component';
import { AlertComponent } from './component/alert/alert.component';
import { CardComponent, CardBodyComponent, CardFooterComponent, CardHeaderComponent } from './component/card/card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotifierComponent,
    ConfirmComponent,
    AlertComponent,
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    CardHeaderComponent
  ],
  exports: [
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    CardHeaderComponent
  ],
  entryComponents: [
    NotifierComponent,
    ConfirmComponent,
    AlertComponent
  ]
})
export class SharedModule { }
