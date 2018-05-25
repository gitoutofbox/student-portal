import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.css']
})
export class CommonModalComponent implements OnInit {

  constructor() { }
  @Input() showModal: boolean = false;
  @Output('modalClose') modalClose = new EventEmitter <boolean>();
  ngOnInit() {
  }

  closeModal(e) {
    e.preventDefault();
    this.showModal = false;
    this.modalClose.emit(true);
  }
}
