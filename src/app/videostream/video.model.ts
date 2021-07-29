export interface Video {
  videoId?: string;
  title?: string;
  description?: string;
  picURL?: string;
}

export interface VideoResult {
  kind: string[];
  items: VideoItem[];
  [prop: string]: any;
}

export interface VideoItem {
  id?: { videoId: string };
  snippet?: {
    title: string;
    description: string;
    thumbnails: { high: { url: string } };
  };
}

export interface VideoInList {
  isDisabled: boolean;
  selectedVideo: Video;
}
