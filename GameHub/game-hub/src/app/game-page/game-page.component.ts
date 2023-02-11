import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../model/IGame.interface';
import { AlertService } from '../services/alert.service';
import { GamesService } from '../services/games.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit{

  ratingForm!: UntypedFormGroup;
  tempGames!: Game;
  displayGame: Game = {
    gameId : '',
    gameName : '',
    gameGenre : '',
    gameRelease : '',
    gameAgeV : '',
    storeLink : '',
    gameDesc : '',
    gameImage : '',
    gameRating :[]

  };
  imgUrl!: string;
  public currentGameId!: string;

  constructor(private config: NgbRatingConfig,
              private route: ActivatedRoute,
              private gameService: GamesService,
              private alertService: AlertService,
              private fireStorage: AngularFireStorage ) {
    this.config.max = 5;
    this.config.readonly = false; 
  }

  ngOnInit(): void {

    this.ratingForm = new UntypedFormGroup(
      {
        ratingVal: new UntypedFormControl(null, Validators.required),
      }
    );


    this.currentGameId = this.route.snapshot.params['id'];

    // acelasi lucru ca mai sus, dar pt routerLink:
    this.route.params.subscribe(
      (params) => {
        this.currentGameId = params['id'];
        this.gameService.getGames().subscribe(games => {
          this.tempGames = games.find(g => g.gameId === this.currentGameId)!;
          if(this.tempGames!=null)
          {
            this.displayGame.gameName = this.tempGames.gameName;
            this.displayGame.gameGenre = this.tempGames.gameGenre;
            this.displayGame.gameRelease = this.tempGames.gameRelease;
            this.displayGame.gameAgeV = this.tempGames.gameAgeV;
            this.displayGame.storeLink = this.tempGames.storeLink;
            this.displayGame.gameDesc = this.tempGames.gameDesc;
            this.displayGame.gameImage = this.tempGames.gameImage;
          }
          this.fireStorage.ref(this.displayGame.gameImage).getDownloadURL().subscribe(url => {
          this.imgUrl = (url!= '') ? url : './assets/images/cover3.jpg';
          });
        
        });
      }
    );


  }

  rateGame()
  {
    this.tempGames.gameRating.push(this.ratingForm.value.ratingVal);
    this.gameService.updateGame(this.tempGames);
    this.alertService.successf('Game rated successfully!');
    this.ratingForm.reset();
  }

  get ratingVal()
  {
    return this.ratingForm.get('ratingVal') as UntypedFormControl;
  }

}
