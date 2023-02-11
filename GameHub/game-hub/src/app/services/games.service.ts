import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Game } from '../model/IGame.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  gamesCollection!: AngularFirestoreCollection<Game>;
  games!: Observable<Game[]>;

  constructor(public dp: AngularFirestore)
  {
    this.gamesCollection = this.dp.collection('games');
    this.games = this.gamesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Game;
        data.gameId = a.payload.doc.id;
        //console.log(data.gameRelease);
        return data;
      });
    }));
  }

  getGames()
  {
    return this.games;
  }

  addGame(game: Game)
  {
    this.gamesCollection.add(game);
  }

  updateGame(game: Game)
  {
    this.gamesCollection.doc(game.gameId).update(game);
  }





}
