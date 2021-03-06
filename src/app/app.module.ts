import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { EmailListComponent } from './emails/list/list.component';
import { EmailUpdateComponent } from './emails/update/update.component';
import { GroupListComponent } from './groups/list/list.component';
import { GroupUpdateComponent } from './groups/update/update.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ApiService } from './api.service';
import { MessageService } from './message.service';
import { TinymceModule } from 'angular2-tinymce';
import { GroupEmailListComponent } from './groups/group-emails/list/group-email-list.component';
import { GroupEmailUpdateComponent } from './groups/group-emails/update/group-email-update.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CommonModalComponent } from './common-modal/common-modal.component';
import { ModalLauncherComponent } from './modal-launcher/modal-launcher.component';


const appRoutes: Routes = [
  {
    path: 'emails',
    component: EmailListComponent
  }, {
    path: 'email-update/:id',
    component: EmailUpdateComponent
  }, {
    path: 'email-add',
    component: EmailUpdateComponent
  },
  
  {
    path: 'groups',
    component: GroupListComponent
  },{
    path: 'group-add',
    component: GroupUpdateComponent
  },
  {
    path: 'group-update/:id',
    component: GroupUpdateComponent
  },
  
          {
            path: 'group-emails/:groupId',
            component: GroupEmailListComponent
          },
          {
            path: 'group-emails/:groupId/add',
            component: GroupEmailUpdateComponent
          },
          {
            path: 'group-emails/:groupId/update/:id',
            component: GroupEmailUpdateComponent
          },

  {
    path: 'send-email',
    component: SendEmailComponent
  },
  {
    path: 'modal-launcher',
    component: ModalLauncherComponent
  },



  { 
    path: '',
    redirectTo: '/emails',
    pathMatch: 'full'
  }  
];


@NgModule({
  declarations: [
    AppComponent,
    EmailListComponent,
    EmailUpdateComponent,
    GroupListComponent,
    GroupUpdateComponent,
    SendEmailComponent,
    GroupEmailListComponent,
    GroupEmailUpdateComponent,
    SubscribeComponent,
    ModalComponent,
    PaginationComponent,
    CommonModalComponent,
    ModalLauncherComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, TinymceModule, 
    RouterModule.forRoot(
      appRoutes, {enableTracing: false}
    )
  ],
  providers: [ApiService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
