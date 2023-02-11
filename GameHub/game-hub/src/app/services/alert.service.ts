import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  successf(message: string)
  {
    alertify.success(message);
  }

  errorf(message: string)
  {
    alertify.error(message);
  }

  warningf(message: string)
  {
    alertify.warning(message);
  }

}