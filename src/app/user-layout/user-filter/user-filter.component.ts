import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Filter } from 'src/app/model/filter.model';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit, AfterViewInit {
  @Output() onFilter = new EventEmitter<Filter>();
  
  form: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required)
    });
  }

  ngAfterViewInit() {
    MaterialService.updateTextInputs();
  }

  onSubmit() {
    let filter: Filter = {
      username: '',
      name: ''
    };
    if (this.form.valid) {
      filter = {
        name: this.form.get('name').value,
        username: this.form.get('username').value
      };
      this.onFilter.emit(filter);
    }
  }

}
