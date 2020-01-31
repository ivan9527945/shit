import { Component, OnInit, Input } from '@angular/core';
import { ModalOverlayRef } from '../../../services/modal/modal-overlay-ref';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {
  @Input() text: string;
  constructor(
    public modalOverlayRef: ModalOverlayRef
  ) { }

  ngOnInit() {
  }

}
