import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-section',
  templateUrl: './input-section.component.html',
  styleUrls: ['./input-section.component.css'],
})
export class InputsectionComponent implements OnInit {
  @Output() searchTerm = new EventEmitter<string>();
  faSearchIcon = faSearch;

  constructor() {}
  ngOnInit(): void {}
  onSubmit(inputTerm: string) {
    this.searchTerm.emit(inputTerm);
  }
}
