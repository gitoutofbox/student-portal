import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService }  from '../api.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  private submitted :boolean;
  private groupList: any;
  constructor(private fb: FormBuilder, private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.get('http://localhost:3003/groups').subscribe(response => {this.setupEditData(response.data)});
  }
  private setupEditData(editDataObj: any) {
    this.groupList = editDataObj;
  }
  private emailForm = this.fb.group({
      group: ['', Validators.required],
      subject: ['', Validators.compose([Validators.required])],
      mainBody: ['', Validators.required]
  });

  onSubmit(){
      this.submitted = true;
      if(this.emailForm.valid) {
          console.log(this.emailForm)
      }
      
  };

}
