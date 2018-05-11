import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService }  from '../api.service';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  constructor(private fb: FormBuilder, private apiService: ApiService) { }
  private groups: Array <any>;
  private submitted: boolean;
  private  subscribeForm = this.fb.group({
    groupId: [''],
    name: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])]
  })
  ngOnInit() {
    this.apiService.get('http://localhost:3003/groupsTOSubscribe')
    .subscribe(response => {this.groups = response.data});
  }
  onSubmit(){
    this.submitted = true;
    if(this.subscribeForm.valid) {
        let postData = {
            email    : this.subscribeForm.value.email,
            name     : this.subscribeForm.value.name
        }
    
        this.apiService.post('http://localhost:3003/email', postData).subscribe(response => {
            let emailId = response.data.insertId;
            if(this.subscribeForm.value.groupId) {
              this.addInGroup(emailId);
            }
        });
    }
  };

  addInGroup(emailId) {
    let postData = {
      email_id: emailId,
      group_id: this.subscribeForm.value.groupId
    }
    this.apiService.post('http://localhost:3003/groupEmails', postData).subscribe(response => {console.log('asdasd')});
  }
}