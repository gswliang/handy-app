import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoList: string[] = [
    "walking dogs",
    "buying groceries"
  ]
  constructor() { }

  getList(): string[] {
    return this.todoList.slice();
  }

  addToList(newTodo: string): void {
    this.todoList.push(newTodo);
  }

  removeFromList(removeItem: string): string[] {
    this.todoList = this.todoList.filter(item => item != removeItem)
    return this.todoList;
  }
}
