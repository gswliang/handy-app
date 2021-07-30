import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { TodoVideo } from '../todo-list/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // todoLists: TodoVideo[] = [
  //   { text: 'walking dogs' },
  //   {
  //     text: 'buying groceries',
  //   },
  //   {
  //     video: {
  //       videoId: 'PO8eUBRzTNE',
  //       title: 'Taipei, Taiwan 🇹🇼 - by drone (4K)',
  //       description:
  //         'In this clip you can see all famous sights like the Taipei 101, Elephant Mountain, Agora Garden, Daan Forest Park, New Taipei Bridge, MRT Taoyuan airport Line ...',
  //       picURL: 'https://i.ytimg.com/vi/PO8eUBRzTNE/hqdefault.jpg',
  //     },
  //   },
  //   {
  //     text: 'Hello',
  //   },
  //   {
  //     video: {
  //       videoId: 'PO8eUBRzTNE',
  //       title: 'Taipei, Taiwan 🇹🇼 - by drone (4K)',
  //       description:
  //         'In this clip you can see all famous sights like the Taipei 101, Elephant Mountain, Agora Garden, Daan Forest Park, New Taipei Bridge, MRT Taoyuan airport Line ...',
  //       picURL: 'https://i.ytimg.com/vi/PO8eUBRzTNE/hqdefault.jpg',
  //     },
  //   },
  // ];
  constructor() {}

  // getList(): Observable<string[]> {
  //   return of(this.todoList);
  // }

  // addToList(newTodo: string) {
  //   this.todoLists = [...this.todoLists, { text: newTodo }];
  //   console.log(this.todoLists);
  // }

  // removeFromList(removeItem: string): string[] {
  //   this.todoList = this.todoList.filter((item) => item != removeItem);
  //   return this.todoList;
  // }
}
