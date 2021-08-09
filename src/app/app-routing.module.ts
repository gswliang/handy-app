import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HomeComponent } from './home/home.component';
import { UtubeComponent } from './utube/utube.component';
import { NavibarComponent } from './navibar/navibar.component';
import { ResultComponent } from './result/result.component';
import { MainvideoComponent } from './mainvideo/mainvideo.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    component: NavibarComponent,
    children: [
      { path: 'todo', component: TodoListComponent },
      { path: 'utube', component: UtubeComponent },
      { path: 'utube/result', component: ResultComponent },
      { path: 'utube/detail/:id', component: MainvideoComponent },
      { path: 'utube/detail', redirectTo: '/utube', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
