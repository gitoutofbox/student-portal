import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Router } from '@angular/router';
import { ApiService }  from '../../../api.service';

@Component({
  selector: 'app-group-email-list',
  templateUrl: './group-email-list.component.html',
  styleUrls: ['./group-email-list.component.css']
})
export class GroupEmailListComponent implements OnInit {
  private groupId: number;
  private emails: any;
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.route.params.subscribe( params  => {
        this.groupId = params['groupId'];
    } );
  }

  ngOnInit() {
    if(this.groupId) {
      this.apiService.get('http://localhost:3003/groupEmails/'+this.groupId)
      .subscribe(response => {this.emails = response.data });
    }
  }

}
