import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PostService } from "../../services/post.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  postForm!: FormGroup;
  editPostId = "";
  mode = "create";
  @ViewChild("container", { read: ElementRef, static: false })
  public container: ElementRef;

  constructor(private formBuilder: FormBuilder, private postSvc: PostService) {}

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      postTitle: [""],
      postMessage: [""]
    });

    setTimeout(() => {
      console.log("container", this.container);
    }, 500);
  }

  addPost() {
    console.log("ADding post");
    this.postSvc.addToPost(
      this.postForm.controls.postTitle.value,
      this.postForm.controls.postMessage.value
    );
    this.postForm.controls.postMessage.setValue("");
    this.postForm.controls.postTitle.setValue("");
    this.postSvc.changeInPost(true);
  }

  editPost(event: any) {
    console.log("Trying to Edit", event);
    this.editPostId = event;
    this.scroll(this.container.nativeElement as HTMLElement);
    this.mode = "edit";
    const post = this.postSvc.fetchPosts().find(posts => posts.id === event);
    console.log("Fetched post", post);
    this.postForm.controls.postMessage.setValue(post.content);
    this.postForm.controls.postTitle.setValue(post.title);
  }

  savePost() {
    console.log("saving post");
    this.postSvc.updatePost(
      this.editPostId,
      this.postForm.controls.postTitle.value,
      this.postForm.controls.postMessage.value
    );
    this.postForm.controls.postMessage.setValue("");
    this.postForm.controls.postTitle.setValue("");
  }

  cancel() {
    this.mode = "create";
    this.postForm.controls.postMessage.setValue("");
    this.postForm.controls.postTitle.setValue("");
  }

  scroll(element: HTMLElement) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
