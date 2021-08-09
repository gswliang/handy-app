import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoDetailService } from '../services/video-detail.service';

@Component({
  templateUrl: './utube.component.html',
  styleUrls: ['./utube.component.css'],
})
export class UtubeComponent implements OnInit {
  constructor(
    private router: Router,
    private videoService: VideoDetailService
  ) {}

  ngOnInit(): void {
    this.videoService.renderVideoList();
  }

  onSearch(searchTerm: string) {
    this.router.navigate(['utube/result'], {
      queryParams: { search: searchTerm },
    });
  }
}
