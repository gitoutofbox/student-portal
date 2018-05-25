import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'modal-dialogue',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
 
  constructor() { }
  @Input() showModal: boolean = false;
  @Input() data: string;

  @Output('okCallback') 
  okCallback = new EventEmitter <boolean>();
  ngOnInit() {
  }

  delete() {
    this.okCallback.emit();
    this.closeModal();
  }
  closeModal() {
    this.okCallback.emit();
    this.showModal = false; 
  }
  
}
