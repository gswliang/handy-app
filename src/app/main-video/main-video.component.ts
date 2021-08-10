import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';
import { VideoDetailService } from 'src/app/services/video-detail.service';
import { Video } from 'src/app/videostream/video.model';

@Component({
  selector: 'app-mainvideo',
  templateUrl: './main-video.component.html',
  styleUrls: ['./main-video.component.css'],
})
export class MainvideoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private store: StoreService,
    private videoService: VideoDetailService
  ) {}

  tubeURL: string = 'https://www.youtube.com/embed/';
  paramId$ = this.route.paramMap.pipe(map((paramMap) => paramMap.get('id')));
  videoList$ = this.store.video$;

  mainVideoUrl$: Observable<SafeResourceUrl | null> = this.paramId$.pipe(
    map((mainVideoId) =>
      mainVideoId ? this.getSanitizeURL(mainVideoId) : null
    )
  );

  filterVideo$: Observable<Video[]> = combineLatest([
    this.paramId$,
    this.videoList$,
  ]).pipe(
    map(([paramId, videoList]) =>
      videoList.filter((video) => video.videoId === paramId)
    )
  );

  getStatus$ = this.filterVideo$.pipe(
    map((video) => {
      console.log(video);

      return video.length === 0
        ? { description: 'No Description Available', title: 'uTube Video' }
        : { description: video[0].description, title: video[0].title };
    })
  );

  ngOnInit(): void {
    this.videoService.renderVideoList();
    this.updateRoute();
    this.checkState();
  }

  checkState() {
    const state = this.store.state;
    const paramId = this.route.snapshot.paramMap.get('id');
    state.videos.length === 0 && paramId && this.videoService.onSearch(paramId);
  }

  updateRoute() {
    this.paramId$.subscribe((id) => !id && this.router.navigate(['/utube']));
  }

  onSearch(searchTerm: string) {
    this.router.navigate(['utube/result'], {
      queryParams: { search: searchTerm },
    });
  }

  private getSanitizeURL(videoId: string | undefined) {
    const fullURL = `${this.tubeURL}${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(fullURL);
  }
}
