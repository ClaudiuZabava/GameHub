import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Comment } from '../model/IComment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommService {

  commentsCollection!: AngularFirestoreCollection<Comment>;
  comments!: Observable<Comment[]>;

  constructor(public dp: AngularFirestore)
  {
    this.commentsCollection = this.dp.collection('comments');
    this.comments = this.commentsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Comment;
        data.commentId = a.payload.doc.id;
        //console.log(data.gameRelease);
        return data;
      });
    }));
  }

  getComments()
  {
    return this.comments;
  }

  addComment(comm: Comment)
  {
    this.commentsCollection.add(comm);
  }

  updateComment(comm: Comment)
  {
    this.commentsCollection.doc(comm.commentId).update(comm);
  }
}
