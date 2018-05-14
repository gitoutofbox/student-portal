import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService }  from '../../../api.service';

@Component({
  selector: 'app-group-email-update',
  templateUrl: './group-email-update.component.html',
  styleUrls: ['./group-email-update.component.css']
})
export class GroupEmailUpdateComponent implements OnInit {
  private addedEmails: any; 
  onDrop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData('text');
    e.target.appendChild(document.getElementById(data));
  }
  onDrag(e) {
    console.log('xxxx');
    e.dataTransfer.setData("text", e.target.id);
  }
  onDragOver(e){
    e.preventDefault();
  }
  private groupId: number;
  private id: number;
  private submitted: boolean;
  private editData: Object;
  private emailList: any;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private apiService: ApiService) {
    this.route.params.subscribe( params  => {
        this.groupId = params['groupId'];
        this.id = params['id'];
    } );
  }
  private updateForm = this.fb.group({
    id: [''],
    groupId: ['', Validators.required],
    emailId: ['', Validators.required]
  });

  ngOnInit() {
    if(this.groupId) {
      this.apiService.get('http://localhost:3003/unAssignedEmails/'+this.groupId)
      .subscribe(response => {this.emailList = response.data });
    }

    if(this.id) {
      this.apiService.get('http://localhost:3003/groupEmailDetail/'+this.id)
      .subscribe(response => {this.editData = response.data });
    }
    this.setupEditData();
  }

  setupEditData() {
    let editData = {id: this.id?this.id:'', groupId: this.groupId, emailId: ''};
    this.updateForm.setValue(editData);
  }
  onSubmit(){
    this.submitted = true;
    console.log(this.updateForm);
    if(this.updateForm.valid) {
        let postData = {
            id           : this.updateForm.value.id,
            email_id    : this.updateForm.value.emailId,
            group_id    : this.updateForm.value.groupId
        }
        if(this.updateForm.value.id != '') {
            this.apiService.put('http://localhost:3003/groupEmails', postData).subscribe(data => {
            this.router.navigate(['/group-emails/'+this.groupId]);
            });
        } else {
            this.apiService.post('http://localhost:3003/groupEmails', postData).subscribe(data => {
              this.router.navigate(['/group-emails/'+this.groupId]);
            });
        }
    }
    
};

}
