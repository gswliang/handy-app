import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private navs: string[] = ["Home", "Todo", "uTube"]

  getNav(): string[] {
    return this.navs.slice();
  }

  constructor() { }
}
