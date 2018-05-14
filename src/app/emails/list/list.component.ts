import { Component, OnInit } from '@angular/core';
import { ApiService }  from '../../api.service';


import { Injectable } from '@angular/core';
export interface IEmail {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'email-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class EmailListComponent implements OnInit {
  private showModal: boolean = false;
  private itemToDelete: Object;
  
  private pageNo:number =  1;
  private recordPerPage: number =2;
  private pagination= new Array(12); 
  private emailList: Array<any>;
  private totalRecords: number;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
            
      this.apiService.post('http://localhost:3003/emails',{pageNo:this.pageNo, recordPerPage:this.recordPerPage})
      .subscribe(response => {this.emailList= response.data.records; this.totalRecords= response.data.totalRows});
      
  }
  delete(email:IEmail) {
    this.showModal = true;
    this.itemToDelete = {
      header: 'Delete Email Confirmation', 
      body:'Do you want to delete email '+email.email+' of '+ email.name,
      okCall: function(){alert('hi');}
    };
  }
  deleteEmailCallback(e) {
    alert(' do delete');
  }
}
