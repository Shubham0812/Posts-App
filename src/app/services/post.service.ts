import { Injectable } from "@angular/core";
import { IPost } from "../models/post.model";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostService {
  id = 0;
  private posts: IPost[] = [];
  private postsUpdated = new BehaviorSubject(false);
  postState = this.postsUpdated.asObservable();

  servicesUrl = "https://posts-service.herokuapp.com/";

  constructor(private http: HttpClient) {
    this.getPosts()
      .pipe(
        map((postData: any) => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(
        data => {
          console.log("Fetched from the server", data);
          this.posts = data;
          this.changeInPost(true);
        },
        err => {}
      );
  }

  addToPost(postTitle: string, postContent: string) {
    const postData: IPost = {
      id: null,
      title: postTitle,
      content: postContent
    };
    this.http.post<any>(this.servicesUrl + "posts", postData).subscribe(
      data => {
        postData.id = data.id;
        this.posts.push(postData);
        this.changeInPost(true);
      },
      err => {
        this.posts.push(postData);
        this.changeInPost(true);
      }
    );
  }

  deletePost(postID: string) {
    return this.http
      .delete(`${this.servicesUrl}api/posts/${postID}`)
      .subscribe(data => {
        this.posts = this.posts.filter(post => {
          return post.id !== postID;
        });
        this.changeInPost(true);
      });
  }

  updatePost(postId: string, postTitle: string, postContent: string) {
    const postData: IPost = {
      id: postId,
      title: postTitle,
      content: postContent
    };
    this.http
      .put(`${this.servicesUrl}api/posts/${postId}`, postData)
      .subscribe(res => {
        console.log("Res after post", res);
        const oldIndex = this.posts.findIndex(post => post.id === postId);
        this.posts[oldIndex] = postData;
        console.log("After updatin", this.posts);
        this.changeInPost(true);
      });
  }

  changeInPost(state: boolean) {
    this.postsUpdated.next(state);
  }

  getPosts(): Observable<any> {
    return this.http.get(this.servicesUrl + "api/posts");
  }

  fetchPosts() {
    return [...this.posts];
  }
}
