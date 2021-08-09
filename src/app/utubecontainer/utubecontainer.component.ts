import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { VideoDetailService } from '../services/video-detail.service';

@Component({
  selector: 'app-utubecontainer',
  templateUrl: './utubecontainer.component.html',
  styleUrls: ['./utubecontainer.component.css'],
})
export class UtubecontainerComponent implements OnInit {
  urlPath$ = this.route.firstChild?.url.pipe(
    map((url) =>
      url[0].path === 'result' ? 'Video Search Result' : 'Main Video'
    ),
    tap(console.log)
  );

  constructor(
    private router: Router,
    private videoService: VideoDetailService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.firstChild?.url.subscribe(console.log);
    this.videoService.renderVideoList();
  }

  onSearch(searchTerm: string) {
    this.router.navigate(['utube/result'], {
      queryParams: { search: searchTerm },
    });

    this.videoService.onSearch(searchTerm);
  }
}
