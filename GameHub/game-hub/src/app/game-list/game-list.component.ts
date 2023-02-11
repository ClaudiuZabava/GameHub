import { Component } from '@angular/core';
import { Game } from '../model/IGame.interface';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {

  gameList!: Game[];

  constructor(private gameService: GamesService) {}

  ngOnInit(): void {
   this.gameService.getGames().subscribe(games => {
      this.gameList = games;
   });
  }

}
