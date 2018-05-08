import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService }  from '../../api.service';

import { Injectable } from '@angular/core';

export interface Email {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'email-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class EmailUpdateComponent implements OnInit {
private id: number;
    private submitted: boolean;
    private editData: Email;
    private updateForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])]
    });
    constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private apiService: ApiService) {
      this.route.params.subscribe( params  => {
          this.id = params['id'];
      } );
    }
    ngOnInit() {
      if(this.id) {
          this.apiService.get('http://localhost:3003/email/'+this.id)
          .subscribe(data => {this.setupEditData(data.data)});
      }
    }
    // duplicateCheck(c: FormControl) {
    //     if(!c.value) {
    //         return {duplicateCheck: true};
    //     }
        
    //     let email   = c.value;
    //     let id      = c.root.controls.id.value;
    //     return this.apiService.post('http://localhost:3003/duplicate/', {type:'email', field:'email', id: id, value: email})
    //     .subscribe(response => {
    //         return {duplicateCheck:response.data?true:false};
    //     });
        
        
    // }
    

    
    
    setupEditData(editDataObj: Email) {
        this.editData = {id:editDataObj.id, name: editDataObj.name, email: editDataObj.email};
        this.updateForm.setValue(this.editData);
    }

    
    onSubmit(){
        this.submitted = true;
        if(this.updateForm.valid) {
            let postData = {
                id      : this.updateForm.value.id,
                name    : this.updateForm.value.name,
                email   : this.updateForm.value.email
            }
            if(this.updateForm.value.id != '') {
                this.apiService.put('http://localhost:3003/email', postData).subscribe(data => {
                this.router.navigate(['/emails']);
                });
            } else {
                this.apiService.post('http://localhost:3003/email', postData).subscribe(data => {
                    this.router.navigate(['/emails']);
                });
            }
        }
        
    };
    
}

