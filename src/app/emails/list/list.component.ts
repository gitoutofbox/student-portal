import { Component, OnInit } from '@angular/core';
import { ApiService }  from '../../api.service';

@Component({
  selector: 'email-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class EmailListComponent implements OnInit {

  private emailList: Array<any>;
    constructor(private apiService: ApiService) {}
    ngOnInit() {
             
        this.apiService.get('http://localhost:3003/emails')
        .subscribe(data => this.emailList = data.data);
        
    }

}
