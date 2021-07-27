import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoList: string[] = [
    "walking dogs",
    "buying groceries"
  ]
  constructor() { }

  getList(): Observable<string[]> {
    return of(this.todoList);
  }

  addToList(newTodo: string) {
    this.todoList = [...this.todoList, newTodo];
  }

  removeFromList(removeItem: string): string[] {
    this.todoList = this.todoList.filter(item => item != removeItem)
    return this.todoList;
  }
}
