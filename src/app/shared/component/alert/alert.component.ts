import { Component, OnInit, Input } from '@angular/core';
import { ModalOverlayRef } from '../../../services/modal/modal-overlay-ref';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() textAsHtml: boolean;
  @Input() btnCloseTitle: string;
  @Input() onClose: () => any;
  constructor(
    private overlayRef: ModalOverlayRef
  ) { }

  ngOnInit() {
  }

  close() {
    this.onClose();
    this.overlayRef.close();
  }

}
