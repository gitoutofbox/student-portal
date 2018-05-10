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
        // let postData = {
        //     id      : this.updateForm.value.id,
        //     name    : this.updateForm.value.name
        // }
        // if(this.updateForm.value.id != '') {
        //     this.apiService.put('http://localhost:3003/group', postData).subscribe(data => {
        //     this.router.navigate(['/groups']);
        //     });
        // } else {
        //     this.apiService.post('http://localhost:3003/group', postData).subscribe(data => {
        //         this.router.navigate(['/groups']);
        //     });
        // }
    }
    
};
}
