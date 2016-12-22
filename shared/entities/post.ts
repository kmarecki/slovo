export interface IPostHeader {
    postId: number;
    title: string;
    date: Date;
}

export interface IPost {
    postId: number;
    title: string;
    date: Date;
    text: string;
    published: boolean;
}