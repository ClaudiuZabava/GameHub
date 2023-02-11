import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MiddlemanService } from '../services/middleman.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output("searchGame") searchGame: EventEmitter<any> = new EventEmitter();

  searchingForm!: UntypedFormGroup;

  constructor(private middleman: MiddlemanService, 
              private alertify: AlertService, 
              private Router: Router) { }


  onSearch() 
  {
    if(this.searchingForm.invalid)
    {
      this.alertify.errorf('Please enter a game name to be searched!');
    }
    else
    {
      this.middleman.setStringToBeSearched(this.searchingForm.value.searchContent);
      this.searchingForm.reset();
      if(this.Router.url == '/searched-games')
      {
        this.searchGame.emit();
      }
      else
      {
        this.Router.navigate( ['/searched-games']);
      }
    }
    
  }

  ngOnInit(): void {
    this.searchingForm = new UntypedFormGroup(
      {
        searchContent: new UntypedFormControl(null, Validators.required)
      });

    }

  get searchContent()
  {
    return this.searchingForm.get('searchContent') as UntypedFormControl;
  }

}
