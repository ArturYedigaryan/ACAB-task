import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance } from 'src/app/model/materialInstance.model';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/usersService';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Filter } from 'src/app/model/filter.model';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, AfterViewInit, OnDestroy  {
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip1: MaterialInstance;
  filter = {};
  isFilterVisible = true;
  users: User[] = [];
  reloading = false;
  loading = false;
  userSub: Subscription;
  addUserSub: Subscription;
  editUserSub: Subscription;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.reloading = true;
    this.fetch();
    this.usersService.addUserSubject.subscribe(user => {
      this.usersService.createUser(user).subscribe(data => {
        this.users.unshift(data);
      });
    });

    this.usersService.userEditSubject.subscribe(user => {
      this.usersService.editUser(user).subscribe(data => {
      });
    });
  }

  ngAfterViewInit() {
    this.tooltip1 = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if (this.addUserSub) {
      this.addUserSub.unsubscribe();
    }

    if ( this.editUserSub) {
      this.editUserSub.unsubscribe();
    }
  }
  fetch() {
    this.userSub = this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
      this.loading = false;
      this.reloading = false;
    });
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }

  applyFilter(filter: Filter) {
    this.users = [];
    this.filter = filter;
    this.reloading = true;
    this.usersService.filterUser(filter).subscribe(users => {
      this.users = users;
      this.loading = false;
      this.reloading = false;
    });
  }

  deleteUsers(users) {
    for (const user of users) {
      this.usersService.removeUser(user.id).subscribe(data => {
        this.users = this.users.filter(u => u.id !== user.id);
      });
    }
  }
}

