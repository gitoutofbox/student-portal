import { Component, OnInit } from '@angular/core';
import { ApiService }  from '../../api.service';

@Component({
  selector: 'email-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class EmailListComponent implements OnInit {

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

}
