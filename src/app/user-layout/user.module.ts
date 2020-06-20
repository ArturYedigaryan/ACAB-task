import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { UserPageComponent } from './user-page.component';
import { UserFilterComponent } from './user-filter/user-filter.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { DeleteInfoComponent } from '../shared/components/delete-info/delete-info.component';
import { UserModalComponent } from './user-modal/user-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    UserPageComponent,
    UserFilterComponent,
    UserListComponent,
    LoaderComponent,
    DeleteInfoComponent,
    UserModalComponent
  ]
})

export class UserModule {}
