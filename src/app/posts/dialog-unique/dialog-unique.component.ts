import { Component, OnInit } from '@angular/core';
import { ModalOverlayRef } from './../../services/modal/modal-overlay-ref';

@Component({
  selector: 'app-dialog-unique',
  templateUrl: './dialog-unique.component.html',
  styleUrls: ['./dialog-unique.component.scss']
})
export class DialogUniqueComponent implements OnInit {
  title: string;
  nickName: string;

  constructor(
    private overlayRef: ModalOverlayRef
  ) { }

  ngOnInit() {
  }

  alert() {
    this.overlayRef.close();
  }

  close() {
    this.overlayRef.close();
  }

}
