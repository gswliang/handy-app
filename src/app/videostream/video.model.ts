export interface Video {
    videoId?: string;
    title?: string;
    description?: string;
    picURL?: string;
}

export interface VideoResult {
    kind: string[]
    items: string[];
    [prop: string]: any;
}



export interface VideoItems {
    id?: string;
    snippet?: string;
}
