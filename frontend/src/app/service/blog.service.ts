import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly STORAGE_KEY = 'blogPosts';

  constructor() { }

  getPosts(): BlogPost[] {
    const storedPosts = localStorage.getItem(this.STORAGE_KEY);
    return storedPosts ? JSON.parse(storedPosts) : [];
  }

  savePosts(posts: BlogPost[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
  }

  addPost(post: BlogPost): void {
    const posts = this.getPosts();
    const newPost: BlogPost = { 
      ...post, 
      id: Date.now(), // Generating a unique ID using timestamp
      likes: post.likes ?? 0 // Ensuring likes is initialized
    };
    posts.push(newPost);
    this.savePosts(posts);
  }

  updatePost(post: BlogPost): void {
    const posts = this.getPosts().map(p => (p.id === post.id ? post : p));
    this.savePosts(posts);
  }

  deletePost(id: number): void {
    const posts = this.getPosts().filter(p => p.id !== id);
    this.savePosts(posts);
  }

  likePost(id: number): void {
    const posts = this.getPosts().map(p =>
      p.id === id ? { ...p, likes: (p.likes ?? 0) + 1 } : p
    );
    this.savePosts(posts);
  }
}
