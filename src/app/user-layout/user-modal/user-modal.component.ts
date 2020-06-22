import { Component,  Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/usersService';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnChanges {
  @Input() user: User;
  form: FormGroup;
  isAdd = false;
  constructor(private usersService: UsersService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.user.currentValue) {
      this.isAdd = true;
      this.form = new FormGroup({
        name: new FormControl(null, Validators.required),
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        website: new FormControl(null, Validators.required),
      });
    } else {
      this.isAdd = false;
      this.form = new FormGroup({
        name: new FormControl(changes.user.currentValue.name, Validators.required),
        username: new FormControl(changes.user.currentValue.username, Validators.required),
        email: new FormControl(changes.user.currentValue.email, Validators.required),
        website: new FormControl(changes.user.currentValue.website, Validators.required),
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isAdd) {
        const user: User = {
          name: this.form.get('name').value,
          username: this.form.get('username').value,
          email: this.form.get('email').value,
          website: this.form.get('website').value,
        };
        this.usersService.addUserSubject.next(user);
      } else {
        this.user.name = this.form.controls.name.value;
        this.user.username = this.form.get('username').value;
        this.user.email = this.form.get('email').value;
        this.user.website = this.form.get('website').value;
        this.usersService.userEditSubject.next(this.user);
      }

      this.usersService.closeModalSubject.next(true);
    }
  }
}
