import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

import { PostsService } from '../posts.service';
import { MessageService } from '../../services/message.service';
import { DialogTestComponent } from '../dialog-test/dialog-test.component';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  animal: string;
  name: string;

  constructor(
    public postsService: PostsService,
    public dialog: MatDialog,
    private messageSer: MessageService,
  ) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogTestComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  testttt() {
    this.messageSer.notify('资料加载中，请稍候..');
  }
}
