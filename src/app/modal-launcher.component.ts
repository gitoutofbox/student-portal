import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'modal-launcher',
  templateUrl: './modal-launcher.component.html',
  styleUrls: ['./modal-launcher.component.css']
})
export class ModalLauncherComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
  }


  // Modal 1
  private showCommonModal: boolean = false;
  private name: string = 'suorav';
  openModal1(e) {
    e.preventDefault(); 
    this.showCommonModal = true;
  }
  okClick() {
    alert('ok click');
    this.showCommonModal = false;
  }
  cancelClick() {
    alert('cancel click');
    this.showCommonModal = false;
  }
  modalClose(response: boolean) {
    console.log('response', response)
  }

  // Modal 2
  openModal2(e) {
    e.preventDefault(); 
    this.showCommonModal2 = true;
  }
  private showCommonModal2: boolean = false;
  okClick2() {
    alert('fine click');
    this.showCommonModal2 = false;
  }



  // Modal 3
  private submitted = false;
  private contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    content: ['', Validators.required]
});
  openModal3(e) {
    e.preventDefault(); 
    this.showCommonModal3 = true;
  }
  private showCommonModal3: boolean = false;
  onSubmit() {
    this.submitted = true;
    console.log(this.contactForm);
    if(this.contactForm.valid) {
      alert('Valid');
      this.showCommonModal3 = false;
    } else {
      alert('Invalid');
    }
    
  }
}
