import { Video } from '../videostream/video.model';

export interface todo {
  text?: string;
  videoId?: string;
}

export interface TodoVideo {
  text?: string;
  video?: Video;
}
