import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { IPost } from "../../models/post.model";
import { PostService } from "../../services/post.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  postList: IPost[] = [];
  @Output() editPost = new EventEmitter<string>();

  constructor(private postSvc: PostService) {}

  ngOnInit() {
    this.postSvc.postState.subscribe(state => {
      if (state === true) {
        this.postList = this.postSvc.fetchPosts();
        this.postSvc.changeInPost(false);
      }
    });
  }

  delete(postID: string) {
    console.log("Trying to delete", postID);
    this.postSvc.deletePost(postID);
  }

  edit(postID: string) {
    this.editPost.emit(postID);
  }
}
