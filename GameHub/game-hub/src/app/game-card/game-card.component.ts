import { Component, Input, OnInit } from '@angular/core';
import { NgbRatingConfig, NgbRating} from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../model/IGame.interface';
import { GamesService } from '../services/games.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() game!: Game;


  gamerate!: number;
  hovered = 0;
  imgUrl!: string;

  constructor(private config: NgbRatingConfig ,private gameService: GamesService, private fireStorage: AngularFireStorage) {
    this.config.max = 5;
    this.config.readonly = true;
  }

  // function to be used in other instances when I want the image of the game
  getImage()
  {
    this.imgUrl = './assets/images/defaultGame.jpg';

    this.fireStorage.ref(this.game.gameImage).getDownloadURL().subscribe(url => {
      this.imgUrl = url;
      if(this.imgUrl == '')
      {
        this.imgUrl = './assets/images/defaultGame.jpg';
      }
    });

  }

  ngOnInit(): void {
    this.imgUrl = './assets/images/defaultGame.jpg';

    this.fireStorage.ref(this.game.gameImage).getDownloadURL().subscribe(url => {
      this.imgUrl = url;
      if(this.imgUrl == '')
      {
        this.imgUrl = './assets/images/defaultGame.jpg';
      }
    });
    this.gamerate = this.game.gameRating.reduce((a, b) => a + b, 0) / this.game.gameRating.length;
  }

}
