import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { NavibarComponent } from './navibar/navibar.component';
import { VideostreamComponent } from './videostream/videostream.component';
import { HttpClientModule } from '@angular/common/http';
import { VideolistComponent } from './videostream/videolist/videolist.component';
import { UtubeComponent } from './utube/utube.component';
import { InputsectionComponent } from './input-section/input-section.component';
import { ResultComponent } from './result/result.component';
import { MainvideoComponent } from './main-video/main-video.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    HomeComponent,
    NavibarComponent,
    VideostreamComponent,
    VideolistComponent,
    UtubeComponent,
    InputsectionComponent,
    ResultComponent,
    MainvideoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
