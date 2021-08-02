import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Video } from '../videostream/video.model';
import { StoreService } from '../store.service';
import { todo } from '../todo-list/todo.model';

@Injectable({
  providedIn: 'root',
})
export class VideoDetailService {
  // private readonly APIkey: string = 'AIzaSyD84fA8fesV_dVYDp9pR9vZbpcgVflZF2s';
  private readonly APIkey: string = 'AIzaSyAwJJW6tLkk8YJ3D2s3SFMBOgahTIc9t-8';
  private readonly baseURL: string =
    'https://www.googleapis.com/youtube/v3/search?';
  private readonly params: HttpParams = new HttpParams()
    .set('part', 'snippet')
    .set('type', 'video')
    .set('maxResult', 10)
    .set('key', this.APIkey);

  private videoData: Video[] = [
    {
      videoId: '_S5eXj-zZpA',
      title: 'Taipei, Taiwan 2020 - Facts, Sights, People and Food',
      description:
        'Taipei #台北 Lets take a tour to Taipei, Taiwan. One of the largest cities in the world renowned for its architecture, technical advancements and friendly people.',
      picURL: 'https://i.ytimg.com/vi/_S5eXj-zZpA/hqdefault.jpg',
      isDisabled: false,
    },
    {
      videoId: '9YL50CiVheo',
      title: 'Top 7 Things to do in Taipei, TAIWAN',
      description:
        'Taipei unexpectedly turned out to be one of our favourite destinations in Asia. Some of the places on this list were absolutely magical. This Taiwan series is the ...',
      picURL: 'https://i.ytimg.com/vi/9YL50CiVheo/hqdefault.jpg',
      isDisabled: false,
    },
    {
      videoId: 'PO8eUBRzTNE',
      title: 'Taipei, Taiwan 🇹🇼 - by drone (4K)',
      description:
        'In this clip you can see all famous sights like the Taipei 101, Elephant Mountain, Agora Garden, Daan Forest Park, New Taipei Bridge, MRT Taoyuan airport Line ...',
      picURL: 'https://i.ytimg.com/vi/PO8eUBRzTNE/hqdefault.jpg',
      isDisabled: false,
    },
    {
      videoId: 'ZNC9V1J-ebg',
      title: 'Taipei - City Video Guide',
      description:
        "http://www.expedia.com.au/Taipei.d180030.Destination-Travel-Guides In recent decades, Taiwan has transformed itself into one of Asia's premier travel ...",
      picURL: 'https://i.ytimg.com/vi/ZNC9V1J-ebg/hqdefault.jpg',
      isDisabled: false,
    },
    {
      videoId: 'sUv1WhMwUZk',
      title: '10 BEST THINGS TO DO IN TAIPEI | FIRST TIME IN TAIPEI TAIWAN',
      description:
        'Get £5 FREE by using code BABE5: http://bit.ly/2K4oCWq The Curve card allows you to spend from any of your accounts using just one Curve Mastercard® (no ...',
      picURL: 'https://i.ytimg.com/vi/sUv1WhMwUZk/hqdefault.jpg',
      isDisabled: false,
    },
  ];
  private updatedVideo$ = new BehaviorSubject<Video[]>(this.videoData);
  storeVideo$ = this.updatedVideo$.asObservable();

  constructor(private http: HttpClient, private store: StoreService) {}

  getVideos(term: string) {
    if (!term) {
      return of();
    }
    const params = this.params.set('q', term);
    return this.http
      .get<any>(`${this.baseURL}${params}`)
      .pipe(catchError(this.handleError('getApi')));
  }

  get getVideoList(): Video[] {
    return this.updatedVideo$.getValue();
  }

  updateVideo(param: Video[]) {
    this.videoData = [...param];
    this.updatedVideo$.next(this.videoData);
  }

  statusCheck(onStatusChange: todo, isDisabled: boolean) {
    let videoList = this.getVideoList;

    videoList.forEach((video) => {
      if (video.videoId === onStatusChange.videoId) {
        video.isDisabled = isDisabled;
      }
    });

    this.updateVideo(videoList);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of();
    };
  }
}
