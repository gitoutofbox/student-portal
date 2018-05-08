import { Component, OnInit } from '@angular/core';
import { ApiService }  from '../../api.service';

@Component({
  selector: 'group-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class GroupListComponent implements OnInit {

  private listArr: Array<any>;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
           
      this.apiService.get('http://localhost:3003/groups')
      .subscribe(response => this.listArr = response.data);
      
  }

}
