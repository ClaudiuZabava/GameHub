import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// comunicam intre componente prin functia checkLog() si currentStatus() a acestui serviciu.

export class MiddlemanService {

  isLogged!: boolean;
  loggedUser!: string;
  stringTobeSearched: string ='';
  imgURL!: string;
  constructor() { }

  updateState()
  {
    this.loggedUser = localStorage.getItem('token') as string;
    if(this.loggedUser)
    {
      this.isLogged=true;
    }
    else
    {
      this.isLogged=false;
    }
  }

  currentStatus()
  {
    return this.isLogged;
  }

  getSearchedString()
  {
    return this.stringTobeSearched;
  }

  setStringToBeSearched(str: string)
  {
    this.stringTobeSearched = str;
  }

  setImgURL(url: string)
  {
    this.imgURL = url;
  }

  getImgURL()
  {
    return this.imgURL;
  }

}
