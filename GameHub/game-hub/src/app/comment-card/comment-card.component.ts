import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../model/IComment.interface';
import { CommService } from '../services/comm.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input() comm!: Comment;

  imgUrl!: string;

  constructor(private commService: CommService) {
  }

  ngOnInit(): void {
  }

}
