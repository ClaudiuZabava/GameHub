import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { GamesService } from '../services/games.service';
import { Game } from '../model/IGame.interface';
import { AlertService } from '../services/alert.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent 
{

  listingForm!: UntypedFormGroup;
  target: any;
  filePath: string = '';
  previewImg: string = '/assets/images/defaultGame.jpg';

  game: Game = {
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

  constructor(private gameService: GamesService,
              private alertService: AlertService,
              private fireStorage: AngularFireStorage,
              private Router: Router) {}
  
  ngOnInit(): void {
    this.listingForm = new UntypedFormGroup(
      {
        gameName: new UntypedFormControl(null, [Validators.required, Validators.maxLength(27)]),
        gameGenre: new UntypedFormControl(null, [Validators.required, Validators.maxLength(14)]),
        gameAgeV: new UntypedFormControl(null, [Validators.required, Validators.maxLength(3)]),
        gameRelease: new UntypedFormControl(null, Validators.required),
        storeLink: new UntypedFormControl(null, [Validators.required, Validators.minLength(5)]),
        gameDesc: new UntypedFormControl(null, [Validators.required, Validators.minLength(100)])
      }
    );
  }

  selectFile(event: Event) 
  {
    this.target = event.target as HTMLInputElement;
    this.previewImg = '/assets/images/' + this.target.files[0].name;
  }

  addNewGame()
  {
    console.log(this.listingForm.value.gameRelease);
    this.game.gameRelease = moment(this.listingForm.value.gameRelease).add(-1, 'months').format('YYYY-MM-DD');
    console.log(this.game.gameRelease);
    if(this.listingForm.valid &&
      this.game.gameName != '' &&
      this.game.gameGenre != '' &&
      this.game.gameAgeV != '' &&
      this.game.gameRelease != '' &&
      this.game.storeLink != '' &&
      this.game.gameDesc != '')
      {
        this.uploadImage();
        this.game.gameImage = this.filePath;
        this.gameService.addGame(this.game);
        this.game.gameName = '';
        this.game.gameGenre = '';
        this.game.gameAgeV = '';
        this.game.gameRelease = '';
        this.game.storeLink = '';
        this.game.gameDesc = '';
        this.game.gameImage = '';
        this.listingForm.reset();
        this.alertService.successf('Game Added Successfully. Check out the Game List!');
        this.Router.navigate(['/']);
        
      }
      else
      {
        this.alertService.errorf('Please fill out all fields correctly');
      }

  }

  uploadImage()
  {
    if(this.target != null)
    {
      if(this.target.files[0])
      {
        const file = this.target.files[0];
        if(file)
        {
          this.filePath = 'images/' + Math.random() + file.name;
          this.fireStorage.upload(this.filePath, file);

        }
        else
        {
          this.alertService.errorf('Err1: Invalid Image');
        }
      }
      else
      {
        this.alertService.errorf('Err2: Invalid Image');
      }
    }
    else
    {
      this.filePath = 'images/defaultGame.jpg';
    }
    
  }

  get gameName()
  {
    return this.listingForm.get('gameName') as UntypedFormControl;
  }

  get gameGenre()
  {
    return this.listingForm.get('gameGenre') as UntypedFormControl;
  }

  get gameAgeV()
  {
    return this.listingForm.get('gameAgeV') as UntypedFormControl;
  }

  get gameRelease()
  {
    return this.listingForm.get('gameRelease') as UntypedFormControl;
  }

  get storeLink()
  {
    return this.listingForm.get('storeLink') as UntypedFormControl;
  }
  
  get gameDesc()
  {
    return this.listingForm.get('gameDesc') as UntypedFormControl;
  }

}
