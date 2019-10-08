import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: 'home',
    component: PostListComponent
  },
  {
    path: 'edit',
    component: PostEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
