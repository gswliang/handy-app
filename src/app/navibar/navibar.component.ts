import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-navibar',
  templateUrl: './navibar.component.html',
  styleUrls: ['./navibar.component.css']
})
export class NavibarComponent implements OnInit {
  navs: string[] = [];
  constructor(private navService: NavService) { }

  ngOnInit(): void {
    this.navs = this.navService.getNav();
  }

}
