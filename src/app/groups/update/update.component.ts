import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService }  from '../../api.service';

import { Injectable } from '@angular/core';
export interface Group {
  id: number;
  name: string;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class GroupUpdateComponent implements OnInit {

  private id: number;
    private submitted: boolean;
    private editData: Group;
    private updateForm = this.fb.group({
        id: [''],
        name: ['', Validators.required]
    });
    constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private apiService: ApiService) {
        this.route.params.subscribe( params  => {
            this.id = params['id'];
        } );
    }
    

    ngOnInit() {
        if(this.id) {
            this.apiService.get('http://localhost:3003/group/'+this.id)
            .subscribe(response => {this.setupEditData(response.data)});
        }
    }
    setupEditData(editDataObj: Group) {
        this.editData = {id:editDataObj.id, name: editDataObj.name};
        this.updateForm.setValue(this.editData);
    }
    onSubmit(){
        this.submitted = true;
        if(this.updateForm.valid) {
            let postData = {
                id      : this.updateForm.value.id,
                name    : this.updateForm.value.name
            }
            if(this.updateForm.value.id != '') {
                this.apiService.put('http://localhost:3003/group', postData).subscribe(data => {
                this.router.navigate(['/groups']);
                });
            } else {
                this.apiService.post('http://localhost:3003/group', postData).subscribe(data => {
                    this.router.navigate(['/groups']);
                });
            }
        }
        
    };

}
