import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private navItem: NavService) { }
  navs: string[] = [];

  ngOnInit(): void {
    this.navs = this.navItem.getNav();
  }

}
