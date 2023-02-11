import { Component } from '@angular/core';
import { isEmpty } from 'rxjs-compat/operator/isEmpty';
import { Game } from '../model/IGame.interface';
import { AlertService } from '../services/alert.service';
import { GamesService } from '../services/games.service';
import { MiddlemanService } from '../services/middleman.service';

@Component({
  selector: 'app-searched-games',
  templateUrl: './searched-games.component.html',
  styleUrls: ['./searched-games.component.scss']
})
export class SearchedGamesComponent {

  gameList!: Game[];
  stringTobeSearched!: string;

  constructor(private gameService: GamesService,
              private middlemanService: MiddlemanService,
              private alert: AlertService) {}


  public searchGame()
  {
    this.gameList=[];
    this.stringTobeSearched = this.middlemanService.getSearchedString();
    if(this.stringTobeSearched == '')
    { this.alert.errorf('No search string provided!');}
    else
    {
      this.gameService.getGames().subscribe(games => {
        this.gameList = games.filter(g => g.gameName.toLowerCase().includes(this.stringTobeSearched.toLowerCase()));
        if(this.gameList == null || this.gameList.length == 0)
        { this.alert.errorf('No games found!');}
      });

    }
  }

  ngOnInit(): void 
  {
    this.searchGame();
  }
    

}
