import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable, BehaviorSubject, Subject } from 'rxjs';
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
      videoId: '2F4m5Gg3IVo',
      title: '戴資穎自評東奧 享受比賽肯定陳雨菲/愛爾達電視20210801',
      description:
        '東京奧運羽球女單金牌戰戴資穎不敵陳雨菲拿下銀牌小戴賽後分享這一次每場比賽都是硬仗不過很享受跟對手過招並且打出漂亮好球時候也感謝所有台灣人都當他的 ...',
      picURL: 'https://i.ytimg.com/vi/2F4m5Gg3IVo/hqdefault.jpg',
    },
    {
      videoId: 'vVRzxWR0KWM',
      title:
        '羽球場下是好朋友！戴資穎大合照奧運8強　網翻出：好可愛｜三立新聞網 SETN.com',
      description:
        '觀看【三立即時新聞】最新訊息搶先看：http://bit.ly/36jnhEA ◎按讚【三立新聞FB】重大快訊一手掌握：http://bit.ly/2JDZ7c7 ◎下載【三立新聞網APP】隨走隨看新聞 ...',
      picURL: 'https://i.ytimg.com/vi/vVRzxWR0KWM/hqdefault.jpg',
    },
    {
      videoId: 'JTo5Yx8-_rs',
      title: '戴資穎力戰三局落敗 東京奧運獲銀牌/愛爾達電視20210801',
      description:
        '東京奧運羽球項目女子單打金牌戰世界球后戴資穎再度對決中國對手陳雨菲兩個人上演三局大戰戴資穎在想要主動進攻掌握節奏的情況下較多失誤雖然決勝局從最多 ...',
      picURL: 'https://i.ytimg.com/vi/JTo5Yx8-_rs/hqdefault.jpg',
    },
    {
      videoId: 'lyXM6aXvpDI',
      title: '「銀」恨!戴資穎不敵陳雨菲 奧運羽球女單史上第一銀｜TVBS新聞',
      description:
        '本錄影遵守防疫規範，所有人員皆經量體溫、消毒，並全程配戴口罩疫苗接種與猝死之間的關聯尚無定論請注意指揮中心提供資訊✓密切鎖定【國民大會】快來 ...',
      picURL: 'https://i.ytimg.com/vi/lyXM6aXvpDI/hqdefault.jpg',
    },
    {
      videoId: 'tPZJS-cN7DQ',
      title: '【LIVE】7/31 戴資穎東奧羽球女單4強賽 戴爸爸看轉播替小戴加油!',
      description:
        '訂閱運動雲頻道:https://bit.ly/2Sp37CA #2020東京奧運#戴資穎#羽球.',
      picURL: 'https://i.ytimg.com/vi/tPZJS-cN7DQ/hqdefault.jpg',
    },
  ];
  private updatedVideo$ = new BehaviorSubject<Video[]>(this.videoData);
  private mainVideo$ = new BehaviorSubject<Video>(this.videoData[0]);
  storeVideo$ = this.updatedVideo$.asObservable();
  showVideo$ = this.mainVideo$.asObservable();

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

  selectedVideo(id: string | null | undefined) {
    const list = this.getVideoList;
    const result = list.filter((arr) => arr.videoId === id);
    this.mainVideo$.next(result[0]);
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
