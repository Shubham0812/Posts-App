import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-post-edit",
  templateUrl: "./post-edit.component.html",
  styleUrls: ["./post-edit.component.scss"]
})
export class PostEditComponent implements OnInit {
  @Input() postID: string;
  constructor() {}

  ngOnInit() {}
}
