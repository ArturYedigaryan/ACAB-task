import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-delete-info',
  templateUrl: './delete-info.component.html',
  styleUrls: ['./delete-info.component.css']
})
export class DeleteInfoComponent implements OnInit {

  @Output() isRemove = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.isRemove.emit(false);
  }

  delete() {
    this.isRemove.emit(true);
  }

}
