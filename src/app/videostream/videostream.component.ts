import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { VideoDetailService } from './video-detail.service';
import { ValueConverter } from '../../../node_modules/@angular/compiler/src/render3/view/template';
import { Video } from './video.model';


@Component({
  selector: 'app-videostream',
  templateUrl: './videostream.component.html',
  styleUrls: ['./videostream.component.css']
})
export class VideostreamComponent implements OnInit {
  faSearchIcon = faSearch;
  videoSearch = new Subject<string>();
  videoData: string[] = [];
  videoObj: Video;
  constructor(private videoService: VideoDetailService) { }

  ngOnInit(): void {
    this.renderVideo();
  }

  onSubmit(params: string): void {
    this.videoSearch.next(params);
  }

  renderVideo() {
    this.videoSearch.pipe(
      switchMap((searchTerm: string) => this.videoService.getVideos(searchTerm)),
    ).subscribe(result => result.items.map(value => {
      console.log(value);

    }))

  }

}
