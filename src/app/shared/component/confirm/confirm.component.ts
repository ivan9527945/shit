import { Component, OnInit, Input } from '@angular/core';
import { ModalOverlayRef } from '../../../services/modal/modal-overlay-ref';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() textAsHtml: boolean;
  @Input() btnCloseTitle: string;
  @Input() btnConfirmTitle: string;
  @Input() onYes: () => any;
  @Input() onNo: () => any;

  constructor(
    private overlayRef: ModalOverlayRef
  ) { }

  ngOnInit() {
  }

  no() {
    this.onNo();
    this.overlayRef.close();
  }

  async yes() {
    await this.onYes();
    this.overlayRef.close();
  }

}
