import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from '../model/IComment.interface';
import { CommService } from '../services/comm.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {
  commentList!: Comment[];

  constructor(private commService: CommService,
              private Router: Router) {}

  goType()
  {
    this.Router.navigate(['/add-comment']);
  }

  ngOnInit(): void {
   this.commService.getComments().subscribe(comments => {
      this.commentList = comments;
   });
  }

}
