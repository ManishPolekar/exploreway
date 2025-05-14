import { Component } from '@angular/core';
import { BlogService } from '../../service/blog.service';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  posts: BlogPost[]=[];
  newPost: BlogPost = {
    id: 0,
    title: '',
    content: '',
    image: '',
    date: new Date(),
    likes: 0,
  };
  editMode = false;
  editedPostId: number | null = null;

  constructor(private blogService: BlogService) {
    this.posts = this.blogService.getPosts();
  }

  addPost() {
    if (this.editMode && this.editedPostId !== null) {
      const updatedPost = { ...this.newPost, id: this.editedPostId };
      this.blogService.updatePost(updatedPost);
      this.editMode = false;
      this.editedPostId = null;
    } else {
      this.newPost.id = Date.now();
      this.newPost.date = new Date();
      this.newPost.likes = 0;
      this.blogService.addPost(this.newPost);
    }
    this.resetForm();
    this.posts = this.blogService.getPosts();
  }
  deletePost(postId: number) {
    this.blogService.deletePost(postId);
    this.posts = this.blogService.getPosts();
  }
  editPost(post: BlogPost) {
    this.newPost = { ...post };
    this.editMode = true;
    this.editedPostId = post.id;
  }

  likePost(postId: number) {
    this.blogService.likePost(postId);
    this.posts = this.blogService.getPosts();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => (
      this.newPost.image = reader.result as string
    );
  }

  resetForm() {
    this.newPost = {
      id: 0,
      title: '',
      content: '',
      image: '',
      date: new Date(),
      likes: 0
    };
  }
}
