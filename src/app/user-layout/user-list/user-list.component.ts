import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { MaterialInstance } from 'src/app/model/materialInstance.model';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { UsersService } from 'src/app/services/usersService';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,  AfterViewInit, OnDestroy {
  @Input() users: User[];
  @ViewChild('modal') modalRef: ElementRef;
  @ViewChild('modalDel') modalDelRef: ElementRef;
  selectedUser: User;
  deleteUsers: User[] = [];
  modal: MaterialInstance;
  modalDel: MaterialInstance;
  isAddUser = false;

  constructor(private usersService: UsersService) {}
  ngOnInit() {
    this.usersService.closeModalSubject.subscribe(close => {
      if (close) {
        this.closeModal();
      }
    });
  }
  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
    this.modalDel = MaterialService.initModal(this.modalDelRef);
  }

  ngOnDestroy(): void {
    this.isAddUser = false;
    this.modal.destroy();
    this.modalDel.destroy();
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.modal.open();
  }

  addUser() {
    this.selectedUser = null;
    this.isAddUser = true;
    this.modal.open();
  }

  closeModal() {
    this.isAddUser  = false;
    this.modal.close();
  }
  onSelectDelete(){
    this.modalDel.open();
  }

  checkForDelete(user: User) {
    if (this.deleteUsers.length > 0) {
      const idx = this.deleteUsers.findIndex(u => u.id === user.id);
      if ( idx > -1) {
        return this.deleteUsers = this.deleteUsers.filter(u => u.id !== user.id);
      } else {
        return this.deleteUsers.push(user);
      }
    } else {
      return this.deleteUsers.push(user);
    }
  }

  deleteForChecked() {
    this.usersService.deleteUsersSubject.next(this.deleteUsers);
    this.deleteUsers = [];
  }

  isDeleteUser(event) {
    if (event) {
      this.deleteForChecked();
      this.modalDel.close();
    } else {
      this.modalDel.close();
    }
  }

}
