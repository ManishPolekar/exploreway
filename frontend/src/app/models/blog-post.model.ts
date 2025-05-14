export interface BlogPost {
    id: number;
    title: string;
    content: string;
    image: string;
    author?: string;
    date: Date;
    tags?: string[];
    likes?: number;
}