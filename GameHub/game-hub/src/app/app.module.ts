import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { HomeComponent } from './home/home.component';
import { LogoDirective } from './directives/logo.directive';
import { LogoStyleDirective } from './directives/logo-style.directive';
import { GameListComponent } from './game-list/game-list.component';
import { GameCardComponent } from './game-card/game-card.component';
import { AddGameComponent } from './add-game/add-game.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { GamePageComponent } from './game-page/game-page.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { SearchedGamesComponent } from './searched-games/searched-games.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { MyFunctionPipe } from './pipes/mydate.pipe';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';


const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'user-login', component:UserLoginComponent,
  canActivate: [CheckAuthGuard]},
  {path:'user-register', component:UserRegisterComponent,
  canActivate: [CheckAuthGuard]},
  {path:'game-list', component:GameListComponent,
  canActivate: [AuthGuard]},
  {path:'game-card', component:GameCardComponent,
  canActivate: [RoleGuard]},
  {path:'add-game', component:AddGameComponent,
  canActivate: [RoleGuard]},
  {path:'game-page/:id', component:GamePageComponent,
  canActivate: [AuthGuard]},
  {path:'searched-games', component:SearchedGamesComponent,
  canActivate: [AuthGuard]},
  {path: 'discussions', component:DiscussionsComponent},
  {path: 'add-comment', component:AddCommentComponent,
  canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UserLoginComponent,
    UserRegisterComponent,
    HomeComponent,
    LogoDirective,
    LogoStyleDirective,
    GameListComponent,
    GameCardComponent,
    AddGameComponent,
    GamePageComponent,
    SearchedGamesComponent,
    SearchBarComponent,
    CommentCardComponent,
    DiscussionsComponent,
    AddCommentComponent,
    MyFunctionPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatTabsModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
