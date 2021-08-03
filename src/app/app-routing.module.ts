import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HomeComponent } from './home/home.component';
import { VideostreamComponent } from './videostream/videostream.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'todo', component: TodoListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'utube', component: VideostreamComponent },
  { path: 'utube/:id', component: VideostreamComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
