import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input()
  currentPage!: number;

  @Input()
  lastPage!: boolean;

  @Output()
  nextClicked: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  prevClicked: EventEmitter<void> = new EventEmitter<void>();




}
