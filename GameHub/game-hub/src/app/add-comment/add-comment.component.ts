import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Comment} from '../model/IComment.interface';
import { AlertService } from '../services/alert.service';
import { CommService } from '../services/comm.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent 
{

  commentForm!: UntypedFormGroup;
  target: any;
  filePath: string = '';

  comment: Comment = {
    commentId: '',
    comment: '',
    commentDate: '',
    commentUser: ''

  };

  constructor(private commService: CommService,
              private alertService: AlertService,
              private Router: Router) {}
  
  ngOnInit(): void {
    this.commentForm = new UntypedFormGroup(
      {
        commentDesc: new UntypedFormControl(null, [Validators.required, Validators.minLength(15)])
      }
    );
  }

  addNewComment()
  {
    this.comment.commentUser = localStorage.getItem('token')!;
    this.comment.commentDate = new Date().toLocaleString();

    if(this.commentForm.valid &&
      this.comment.comment != '')
      {
        this.commService.addComment(this.comment);
        this.comment.commentUser = '';
        this.comment.commentDate = '';
        this.comment.comment = '';
        this.commentForm.reset();
        this.Router.navigate(['/discussions']);
      }
      else
      {
        this.alertService.errorf('Please fill out all fields correctly');
      }

  }
  
  get commentDesc()
  {
    return this.commentForm.get('commentDesc') as UntypedFormControl;
  }

}

